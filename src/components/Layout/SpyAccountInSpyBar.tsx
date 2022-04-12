import { useStarknet, InjectedConnector } from '@starknet-react/core'
import { Link } from '@chakra-ui/react';
import { useDispatchContext } from "src/components/Context/AppContext";
import { useCallback, useEffect } from "react";

export function SpyAccountInSpyBar() {
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
        <Link
            onClick={() => connect(new InjectedConnector())}
        >
            Spy account
        </Link>
    )
}
