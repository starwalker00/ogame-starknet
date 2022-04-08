import NextLink from "next/link"
import { useStarknet, InjectedConnector } from '@starknet-react/core'
import {
    Button,
    Spacer,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Link,
    Text
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { truncateEthAddress } from 'lib/helper';

export function ConnectWalletInPage() {
    const { account, connect } = useStarknet()
    return (
        <Stack direction="column">
            <Button
                onClick={() => connect(new InjectedConnector())}
            >
                Connect Argent X Wallet
            </Button>
            <Stack direction="row" spacing={1}>
                <Text as="span" fontSize='xs'>Learn more about</Text>
                <Text as="span" fontSize='xs' color="rgb(243, 106, 61)">
                    <NextLink href="https://www.argent.xyz/argent-x/" passHref>
                        <Link isExternal >Argent X for StarkNet</Link>
                    </NextLink>
                </Text>
                <ExternalLinkIcon mx='2px' boxSize={4} />
            </Stack>
        </Stack>
    )
}
