import { useDispatchContext } from "src/components/Context/AppContext";
import { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    FormControl,
    Stack, Input, Button,
    Link, Text,
} from '@chakra-ui/react'

interface SpyAccountInSpyBarProps {
    another: boolean
}

export function SpyAccountInSpyBar({ another }: SpyAccountInSpyBarProps) {
    // popover management
    const [value, setValue] = useState("0x0478d216c25255154e4e6488f073561955d8d5cb03f2024fb55f903ce866dea8");

    const dispatch = useDispatchContext();
    function changeContextAccount() {
        // @ts-ignore
        dispatch({ type: 'set_contextAccount', payload: value });
    }

    return (
        <Popover>
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        {
                            another
                                ?
                                <Stack direction="row"><Link><Text>Spy another</Text></Link></Stack>
                                :
                                <Stack direction="row"><Link><Text>Spy account</Text></Link></Stack>
                        }
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Address</PopoverHeader>
                        <PopoverBody>
                            <form onSubmit={(e) => { e.preventDefault(); changeContextAccount(); onClose(); }}>
                                <Stack direction="column" width={'full'} alignItems='center'>
                                    <Input
                                        textAlign='center'
                                        value={value}
                                        onChange={e => setValue(e.target.value)} />
                                    <Button
                                        type="submit"
                                        size="sm"
                                        px={12}
                                        width={'fit-content'}>
                                        Spy account
                                    </Button>
                                </Stack>
                            </form>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}
