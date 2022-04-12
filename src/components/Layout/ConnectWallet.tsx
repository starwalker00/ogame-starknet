import { useStarknet, InjectedConnector } from '@starknet-react/core'
import {
    Button,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { truncateEthAddress } from 'src/lib/helper';
import { useDispatchContext } from 'src/components/Context/AppContext';
import { useCallback, useEffect } from 'react';
import { TransactionListModal } from './MenuElements/TransactionListModal';

export function ConnectWallet() {
    const { account, connect } = useStarknet()
    const dispatch = useDispatchContext();

    // change context account on connection to Argent X
    const changeContextAccount = useCallback(() => {
        dispatch({ type: 'set_contextAccount', payload: account });
    }, [account, dispatch]);
    useEffect(() => {
        changeContextAccount();
    }, [changeContextAccount]);

    // tx modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (account) {
        return (
            <>
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
                        <MenuItem onClick={() => changeContextAccount()}>
                            Use this account
                        </MenuItem>
                        <MenuItem onClick={() => onOpen()}>
                            Transactions
                        </MenuItem>
                    </MenuList>
                </Menu >
                <TransactionListModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            </>
        )
    }

    return <button onClick={() => connect(new InjectedConnector())}>Connect</button>
}
