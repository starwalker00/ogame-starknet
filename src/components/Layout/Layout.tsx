import Head from 'next/head'
import { TransactionListStatus } from '../TransactionManagement/TransactionListStatus'

export default function Layout({ children }: any) {
    return (
        <>
            <Head>
                <title>Template</title>
            </Head>
            <TransactionListStatus />
            <main>{children}</main>
        </>
    )
}
