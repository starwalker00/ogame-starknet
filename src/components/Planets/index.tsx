import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import NextLink from "next/link"
import { Layout, Navbar } from 'src/components/Layout'
import { ResourceBar } from 'src/components/Layout'
import { UseOrSpyBar } from 'src/components/Layout/UseOrSpyBar'
import { Container, Center, Stack, Heading, Text, Link, Button, Image, Flex } from '@chakra-ui/react'
import { useAppContext } from 'src/components/Context/AppContext'
import { useStarknet } from '@starknet-react/core'
import { usePlanets } from 'src/hooks/planets'
import { ConnectWalletInPage } from 'src/components/Layout/ConnectWalletInPage'

const Planets: NextPageWithLayout = () => {
    // accounts
    const { account } = useStarknet();
    const hasSignedAccount = Boolean(account);
    const { contextAccount } = useAppContext();
    const hasContextAccount = Boolean(contextAccount);
    // planet data
    const [planetID, loading] = usePlanets(contextAccount);
    const hasPlanetID = Boolean(planetID);

    return (
        <>
            <Container maxW={'4xl'} px={0} py={12} border='2px solid teal'>
                <Heading px={12}>Planets</Heading>
                {
                    (hasContextAccount) && hasPlanetID &&
                        planetID > 0
                        ?
                        < Center>
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Text as="span" fontSize='md'>You owned planet #{planetID.toString(10)}.</Text>
                                <Flex height={{ base: "300", md: "400" }}>
                                    <Image src="/nasa-ScBkW9AKgcA-unsplash.jpg" alt='Planet' />
                                </Flex>
                            </Stack>
                        </Center>
                        :
                        < Center>
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <Text as="span" fontSize='md'>You do not owned a planet.</Text>
                                {hasSignedAccount
                                    ?
                                    <Button>Colonize a planet</Button>
                                    :
                                    <ConnectWalletInPage />
                                }
                            </Stack>
                        </Center>
                }
                <Center mt={12}>
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
