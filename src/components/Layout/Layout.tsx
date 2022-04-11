import Head from 'next/head'
import { TransactionList } from '../TransactionList'
import { TransactionListStatus } from '../TransactionListStatus'
import { Divider } from '@chakra-ui/layout'

export default function Layout({ children }: any) {
    return (
        <>
            <Head>
                <title>Template</title>
            </Head>
            <TransactionList />
            <Divider />
            <TransactionListStatus />
            <main>{children}</main>
        </>
    )
}
