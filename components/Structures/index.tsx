import type { NextPageWithLayout } from '@custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from '@components/Layout'
import { ResourceBar } from '@components/Layout'
import { Center, Container, Heading, Stack, Box } from '@chakra-ui/react'
import { VStack, Flex, Text } from '@chakra-ui/react'
import { useStructures } from '../../hooks/structures'
import StructureItem from '@components/Structures/StructureItem'
import BuildStatus from '@components/Structures/BuildStatus'
import { useStarknet } from '@starknet-react/core'
import { Structure } from '@custom-types/ogame'

const Structures: NextPageWithLayout = () => {
    const { account } = useStarknet();
    const hasAccount = Boolean(account);
    const [dataStructures] = useStructures();
    // const hasDataStructures = dataStructures.length > 0;
    return (
        <Container maxW={'4xl'} p="12" border='2px solid teal'>
            <Heading>Structures</Heading>

            {
                !hasAccount
                    ?
                    <h1>no acc</h1>
                    :
                    <>
                        <Box margin={10}>
                            <BuildStatus />
                        </Box>
                        <Stack direction='column' spacing={8}>
                            {
                                dataStructures.map((structure: Structure) =>
                                    <StructureItem key={structure.name} structure={structure} />
                                )
                            }
                        </Stack>
                    </>
            }
        </Container>
    )
}

Structures.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            <ResourceBar />
            {page}
        </Layout>
    )
}

export default Structures
