import { Transaction, useStarknetTransactionManager } from '@starknet-react/core'
import { namedConsoleLog, truncateEthAddress } from 'src/lib/helper'
import { Button, Text, Link, useToast, UseToastOptions } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';
import { Status } from 'starknet/dist/types';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Stack, Spinner } from '@chakra-ui/react'

function TransactionItem({ transaction }: { transaction: Transaction }) {
    // namedConsoleLog("transaction", transaction);
    return (
        <span>
            {transaction.transactionHash} - {transaction.status}
        </span>
    )
}

export function TransactionListStatus() {
    const { transactions } = useStarknetTransactionManager()
    const toast = useToast()

    // store tx addresses that do not need toast rerender (after success or error)
    const transactionRefs = useRef<string[]>([]);

    useEffect(() => {
        if (transactions.length > 0) {
            transactions.forEach(transaction => {
                const { transactionHash, status } = transaction;
                const id = transactionHash;
                let options = {
                    title: "Transaction status",
                    status: "info",
                    description:
                        <Stack direction="column" alignItems='center'>
                            <Spinner mt={2} size='xs' />
                            <Text>
                                {status}
                            </Text>
                            <Text>
                                <Link isExternal href={"https://goerli.voyager.online/tx/".concat(transactionHash)}>
                                    {truncateEthAddress(transactionHash)}
                                    <ExternalLinkIcon mx='8px' />
                                </Link>
                            </Text>
                        </Stack >,
                    duration: 3000000, // 3 min
                    position: "bottom-right",
                    isClosable: true,
                };
                switch (status) {
                    case 'TRANSACTION_RECEIVED':
                        options = { ...options, status: 'warning', }
                        break;
                    case 'RECEIVED':
                        options = { ...options, status: "warning" }
                        break;
                    case 'PENDING':
                        options = { ...options, status: "warning" }
                        break;
                    case 'ACCEPTED_ON_L2':
                        options = {
                            ...options, status: "success", duration: 10000,
                            description:
                                <Stack direction="column" alignItems='center'>
                                    <Text mt={2}>
                                        {status}
                                    </Text>
                                    <Text>
                                        <Link isExternal href={"https://goerli.voyager.online/tx/".concat(transactionHash)}>
                                            {truncateEthAddress(transactionHash)}
                                            <ExternalLinkIcon mx='8px' />
                                        </Link>
                                    </Text>
                                </Stack>,
                            //@ts-ignore
                            onCloseComplete: () => {
                                //@ts-ignore
                                // toast.update(id, { ...options, containerStyle: { width: '0px', backgroundColor: "teal" } })
                                transactionRefs.current.push(id);// id = transactionHash
                            }
                        }
                        break;
                    case 'REJECTED':
                        options = {
                            ...options, status: "error", duration: 10000,
                            description:
                                <Stack direction="column" alignItems='center'>
                                    <Text mt={2}>
                                        {status}
                                    </Text>
                                    <Text>
                                        {truncateEthAddress(transactionHash)}
                                    </Text>
                                </Stack>,
                            //@ts-ignore
                            onCloseComplete: () => {
                                //@ts-ignore
                                // toast.update(id, { ...options, containerStyle: { width: '0px', backgroundColor: "teal" } })
                                transactionRefs.current.push(id);// id = transactionHash
                            }
                        }
                        break;
                    default:
                        options = { ...options, status: "info" }
                        console.log(`Unrecognized status ${status}.`);
                }
                // namedConsoleLog("transactionRefs.current", transactionRefs.current);
                // !transactionRefs.current.includes(id) ignores completely finished tx
                if (toast.isActive(id) && !transactionRefs.current.includes(id)) {
                    //@ts-ignore
                    toast.update(id, options);
                }
                if (!toast.isActive(id) && !transactionRefs.current.includes(id)) {
                    //@ts-ignore
                    toast({ id: id, ...options });
                }
            })// end foreach
        }// end if
    }, [transactions, toast]);

    return (
        <ul>
            {transactions.map((transaction, index) => (
                <li key={index}>
                    <TransactionItem transaction={transaction} />
                </li>
            ))}
        </ul>
    )
}
