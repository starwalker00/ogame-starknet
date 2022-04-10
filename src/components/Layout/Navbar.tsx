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
    Spacer
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { useStarknet } from '@starknet-react/core'
import { ConnectWallet } from 'src/components/Layout/ConnectWallet';

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { account } = useStarknet();
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack justifyContent='space-between' width={'full'}>
                        {/* <Box>Logo</Box> */}
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <NextLink href='/' passHref>
                                <Link>Home</Link>
                            </NextLink>
                            <NextLink href='/structures' passHref>
                                <Link>Structures</Link>
                            </NextLink>
                            <NextLink href='/leaderboard' passHref>
                                <Link>Leaderboard</Link>
                            </NextLink>
                            <NextLink href='/test' passHref>
                                <Link>Test</Link>
                            </NextLink>
                            <NextLink href='/about' passHref>
                                <Link>About</Link>
                            </NextLink>
                        </HStack>
                        <HStack>
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                            <ConnectWallet />
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NextLink href='/' passHref>
                                <Link>Home</Link>
                            </NextLink>
                            <NextLink href='/structures' passHref>
                                <Link>Structures</Link>
                            </NextLink>
                            <NextLink href='/leaderboard' passHref>
                                <Link>Leaderboard</Link>
                            </NextLink>
                            <NextLink href='/test' passHref>
                                <Link>Test</Link>
                            </NextLink>
                            <NextLink href='/about' passHref>
                                <Link>About</Link>
                            </NextLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
