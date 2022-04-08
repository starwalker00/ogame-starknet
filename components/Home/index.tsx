import type { NextPageWithLayout } from '@custom-types/page'
import type { ReactElement } from 'react'
import NextLink from "next/link"
import { Layout, Navbar } from '@components/Layout'
import { ResourceBar } from '@components/Layout'
import { Container, Center, Stack, Heading, Text, Link } from '@chakra-ui/react'

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Container maxW={'4xl'} p="12" border='2px solid teal'>
                <Heading>Home</Heading>
                <Center>
                    <Stack direction="row" spacing={1}>
                        <Text as="span" fontSize='md'>Nothing here yet, go to </Text>
                        <Text as="span" fontSize='md' color="teal">
                            <NextLink href="/structures" passHref>
                                <Link>Structures</Link>
                            </NextLink>
                        </Text>
                    </Stack>
                </Center>
            </Container>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            <ResourceBar />
            {page}
        </Layout>
    )
}

export default Home
