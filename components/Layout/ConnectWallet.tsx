import { useStarknet, InjectedConnector } from '@starknet-react/core'
import {
    Button,
    Spacer,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { truncateEthAddress } from 'lib/helper';

export function ConnectWallet() {
    const { account, connect } = useStarknet()

    if (account) {
        // return <p>Account: {account}</p>
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
                </MenuList>
            </Menu >
        )
    }

    return <button onClick={() => connect(new InjectedConnector())}>Connect</button>
}
