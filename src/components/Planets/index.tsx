import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import NextLink from "next/link"
import { Layout, Navbar } from 'src/components/Layout'
import { ResourceBar } from 'src/components/Layout'
import { UseOrSpyBar } from 'src/components/Layout/UseOrSpyBar'
import { Container, Center, Stack, Heading, Text, Link } from '@chakra-ui/react'

const Planets: NextPageWithLayout = () => {
    return (
        <>
            <Container maxW={'4xl'} px={0} py={12} border='2px solid teal'>
                <Heading px={12}>Planets</Heading>
                <Center>
                    <Stack direction="row" spacing={1}>
                        <Text as="span" fontSize='md'>Go to </Text>
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

Planets.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            <UseOrSpyBar />
            <ResourceBar />
            {page}
        </Layout>
    )
}

export default Planets
