import NextLink from 'next/link'
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Button,
    Spacer,
    Text,
    Tooltip,
    Divider
} from '@chakra-ui/react';

import { useStarknet } from '@starknet-react/core'
import { useAppContext } from '../Context/AppContext';
import { truncateEthAddress } from 'src/lib/helper';
import { ConnectWalletInSpyBar } from './ConnectWalletInSpyBar';
import { SpyAccountInSpyBar } from './SpyAccountInSpyBar';

export function UseOrSpyBar() {
    // theme
    const { colorMode, toggleColorMode } = useColorMode();
    // accounts
    const { account } = useStarknet();
    const hasSignedAccount = Boolean(account);
    const { contextAccount } = useAppContext();
    const hasContextAccount = Boolean(contextAccount);
    const hasAnyAccount = hasSignedAccount || hasContextAccount;
    return (
        <>
            <Box bg={useColorModeValue('yellow.300', 'yellow.700')} px={4}>
                <Flex alignItems={'center'} justifyContent={'space-between'}>
                    <HStack justifyContent='center' width={'full'}>
                        {
                            (!hasAnyAccount) &&
                            <Stack direction={{ base: "column", sm: "row" }} alignItems="center" spacing={{ base: "0", sm: "2" }}>
                                {/* <Text>Connect Argent X or Spy account</Text> */}
                                <ConnectWalletInSpyBar />
                                <Text>or</Text>
                                <SpyAccountInSpyBar another={false} />
                            </Stack>
                        }
                        {
                            (hasContextAccount && !(account === contextAccount)) &&
                            <Stack direction={{ base: "column", sm: "row" }} alignItems="center" spacing={{ base: "0", sm: "2" }}>
                                <Text>Spying account</Text>
                                {/* <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip> */}
                                <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip>
                                {/* <Divider px={4} orientation='vertical' /> */}
                                <Text>{' '}&#x2013;{' '}</Text>
                                <SpyAccountInSpyBar another={true} />
                            </Stack>
                        }
                        {
                            (hasContextAccount && (account === contextAccount)) &&
                            <Stack direction={{ base: "column", sm: "row" }} alignItems="center" spacing={{ base: "0", sm: "2" }}>
                                <Text>Using account</Text>
                                {/* <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip> */}
                                <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip>
                                {/* <Divider px={4} orientation='vertical' /> */}
                                <Text>{' '}&#x2013;{' '}</Text>
                                <SpyAccountInSpyBar another={false} />
                            </Stack>
                        }
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}
