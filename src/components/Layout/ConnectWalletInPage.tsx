import NextLink from "next/link"
import { useStarknet, InjectedConnector } from '@starknet-react/core'
import {
    Button,
    Stack,
    Link,
    Text
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useDispatchContext } from "src/components/Context/AppContext";
import { useCallback, useEffect } from "react";

export function ConnectWalletInPage() {
    const { account, connect } = useStarknet();
    const dispatch = useDispatchContext();

    // change context account on connection to argent x
    const changeContextAccount = useCallback(() => {
        dispatch({ type: 'set_contextAccount', payload: account });
    }, [account, dispatch]);
    useEffect(() => {
        changeContextAccount();
    }, [changeContextAccount]);

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
                        <Link isExternal>Argent X for StarkNet</Link>
                    </NextLink>
                </Text>
                <ExternalLinkIcon mx='2px' boxSize={4} />
            </Stack>
        </Stack>
    )
}
