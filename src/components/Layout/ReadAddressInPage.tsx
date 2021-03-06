import {
    Button,
    Stack,
    Input
} from '@chakra-ui/react';
import { useDispatchContext } from "src/components/Context/AppContext";
import { useState } from "react";

export function ReadAddressInPage() {

    const [value, setValue] = useState("0x0478d216c25255154e4e6488f073561955d8d5cb03f2024fb55f903ce866dea8");
    const dispatch = useDispatchContext();

    function changeContextAccount() {
        // @ts-ignore
        dispatch({ type: 'set_contextAccount', payload: value });
    }

    return (
        <Stack direction="column" width={'80%'} alignItems='center'>
            <Input
                textAlign='center'
                value={value}
                onChange={e => setValue(e.target.value)} />
            <Button
                px={12}
                width={'fit-content'}
                onClick={changeContextAccount}>
                Spy account
            </Button>
        </Stack>
    )
}
