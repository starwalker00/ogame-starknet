import { useStarknet, InjectedConnector } from '@starknet-react/core'
import {
    Button,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { truncateEthAddress } from 'lib/helper';
import { useDispatchContext } from '@components/Context/AppContext';
import { useEffect } from 'react';

export function ConnectWallet() {
    const { account, connect } = useStarknet()
    const dispatch = useDispatchContext();

    // change context account on connection to argent x
    useEffect(() => {
        changeContextAccount(account);
    }, [account])

    function changeContextAccount(account: string | undefined) {
        // @ts-ignore
        dispatch({ type: 'set_contextAccount', payload: account });
    }

    if (account) {
        return (
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {truncateEthAddress(account)}
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <Stack width={'full'}
                            direction='row'
                            alignItems='baseline'
                            justifyContent='space-between'
                        >
                            <span>Logout</span>
                            <SmallCloseIcon />
                        </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => changeContextAccount(account)}>
                        Use this account
                    </MenuItem>
                </MenuList>
            </Menu >
        )
    }

    return <button onClick={() => connect(new InjectedConnector())}>Connect</button>
}
