import { Transaction, useStarknetTransactionManager } from '@starknet-react/core'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text, Button, Link,
    UnorderedList, ListItem
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { truncateEthAddress } from 'src/lib/helper'

function TransactionItem({ transaction }: { transaction: Transaction }) {
    return (
        <Text>
            <Link isExternal href={"https://goerli.voyager.online/tx/".concat(transaction.transactionHash)}>
                {truncateEthAddress(transaction.transactionHash)}
                <ExternalLinkIcon ml='8px' />
            </Link>
            {' '}&#x2013;{' '}
            {transaction.status}
        </Text>
    )
}

// @ts-ignore
export function TransactionListModal({ isOpen, onOpen, onClose }) {
    const { transactions } = useStarknetTransactionManager()
    const hasTransactions = transactions.length > 0;

    return (
        <>
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Recent transactions</ModalHeader>
                    <ModalCloseButton />
                    {
                        !hasTransactions
                            ?
                            <ModalBody>No transactions to show.</ModalBody>
                            :
                            <ModalBody>
                                <UnorderedList spacing={3}>
                                    {transactions.map((transaction, index) => (
                                        <ListItem key={index}>
                                            <TransactionItem transaction={transaction} />
                                        </ListItem>
                                    ))}
                                </UnorderedList>
                            </ModalBody>
                    }
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
