import type { NextPageWithLayout } from '@custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from '@components/Layout'
import { ResourceBar } from '@components/Layout'
import { Center, Container, Heading, Stack, Box, Tooltip } from '@chakra-ui/react'
import { VStack, Flex, Text } from '@chakra-ui/react'
import { useStructures } from '../../hooks/structures'
import StructureItem from '@components/Structures/StructureItem'
import BuildStatus from '@components/Structures/BuildStatus'
import { useStarknet } from '@starknet-react/core'
import { Structure } from '@custom-types/ogame'
import { ConnectWalletInPage } from '@components/Layout/ConnectWalletInPage'
import { ReadAddressInPage } from '@components/Layout/ReadAddressInPage'

import { useAppContext } from '@components/Context/AppContext'
import { namedConsoleLog, truncateEthAddress } from 'lib/helper'

const Structures: NextPageWithLayout = () => {
    const { account } = useStarknet();
    const hasSignedAccount = Boolean(account);
    const { contextAccount } = useAppContext();
    const hasContextAccount = Boolean(contextAccount);
    const [dataStructures, isUpgradingAny] = useStructures(contextAccount);
    namedConsoleLog('account', account);
    namedConsoleLog('contextAccount', contextAccount);

    // const hasDataStructures = dataStructures.length > 0;
    return (
        <Container maxW={'4xl'} px={0} py={12} border='2px solid teal'>
            {
                !hasSignedAccount &&
                <>
                    <Center py={12}>
                        <ConnectWalletInPage />
                    </Center>
                </>
            }
            {
                // !hasContextAccount &&
                <>
                    <Center py={12}>
                        <ReadAddressInPage />
                    </Center>
                </>
            }
            {
                (hasContextAccount && !(account === contextAccount)) && // only reading stranger account
                <>
                    <Center py={12}>
                        <Stack direction="column" alignItems={'center'}>
                            <Text>Reading account</Text>
                            <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip>
                            {/* <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip> */}
                        </Stack>
                    </Center>
                </>
            }
            {
                (hasContextAccount && account === contextAccount) && // writing with connected account
                <>
                    <Center py={12}>
                        <Stack direction="column" alignItems={'center'}>
                            <Text>Writing with account</Text>
                            <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip>
                            {/* <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip> */}
                        </Stack>
                    </Center>
                </>
            }
            {
                (hasContextAccount) &&
                <>
                    <Heading px={12}>Structures</Heading>
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
