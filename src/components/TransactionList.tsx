import { Transaction, useStarknetTransactionManager } from '@starknet-react/core'
import { namedConsoleLog } from 'src/lib/helper'

function TransactionItem({ transaction }: { transaction: Transaction }) {
    namedConsoleLog("transaction", transaction);
    return (
        <span>
            {transaction.transactionHash} - {transaction.status}
        </span>
    )
}

export function TransactionList() {
    const { transactions } = useStarknetTransactionManager()
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
