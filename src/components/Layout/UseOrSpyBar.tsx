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
    Tooltip
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
                            <>
                                {/* <Text>Connect Argent X or Spy account</Text> */}
                                <ConnectWalletInSpyBar />
                                <Text>or</Text>
                                <SpyAccountInSpyBar />
                            </>
                        }
                        {
                            (hasContextAccount && !(account === contextAccount)) &&
                            <>
                                <Text>Spying account</Text>
                                {/* <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip> */}
                                <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip>
                            </>
                        }
                        {
                            (hasContextAccount && (account === contextAccount)) &&
                            <>
                                <Text>Using account</Text>
                                {/* <Tooltip label={contextAccount}><Text fontSize='sm'>{contextAccount}</Text></Tooltip> */}
                                <Tooltip label={contextAccount}><Text>{truncateEthAddress(contextAccount)}</Text></Tooltip>
                            </>
                        }
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}
