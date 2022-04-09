import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from 'src/components/Layout'
import { ResourceBar } from 'src/components/Layout'
import { Center, Container, Heading, Stack, Box, Tooltip } from '@chakra-ui/react'
import { VStack, Flex, Text } from '@chakra-ui/react'
import { useStructures } from 'src/hooks/structures'
import StructureItem from 'src/components/Structures/StructureItem'
import BuildStatus from 'src/components/Structures/BuildStatus'
import { useStarknet } from '@starknet-react/core'
import { Structure } from 'src/custom-types/ogame'
import { ConnectWalletInPage } from 'src/components/Layout/ConnectWalletInPage'
import { ReadAddressInPage } from 'src/components/Layout/ReadAddressInPage'

import { useAppContext } from 'src/components/Context/AppContext'
import { namedConsoleLog, truncateEthAddress } from 'src/lib/helper'
// import { useBuildTime } from 'src/hooks/buildTime'
import { useBuildTime } from 'src/hooks/buildTime'

const Structures: NextPageWithLayout = () => {
    // accounts
    const { account } = useStarknet();
    const hasSignedAccount = Boolean(account);
    const { contextAccount } = useAppContext();
    const hasContextAccount = Boolean(contextAccount);
    // structure data
    const [dataStructures, isUpgradingAny] = useStructures(contextAccount);
    // const hasDataStructures = dataStructures.length > 0;

    // build time data
    const [buildTime] = useBuildTime(contextAccount);

    namedConsoleLog('account', account);
    namedConsoleLog('contextAccount', contextAccount);

    return (
        <Container maxW={'4xl'} px={0} py={12} border='2px solid teal'>
            {
                // !hasSignedAccount &&
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
                            {/* <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip> */}
                            <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip>
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
                            {/* <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip> */}
                            <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip>
                        </Stack>
                    </Center>
                </>
            }
            {
                (hasContextAccount) &&
                <>
                    <Heading px={12}>Structures</Heading>
                    <Box margin={10}>
                        <BuildStatus buildTime={buildTime} />
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
