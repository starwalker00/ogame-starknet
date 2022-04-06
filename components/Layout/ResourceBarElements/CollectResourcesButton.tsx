import NextLink from 'next/link'
import {
    Box,
    Flex,
    Stack,
    HStack,
    Heading,
    Link,
    Button,
    useColorModeValue,
    Skeleton
} from '@chakra-ui/react';

import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from '../../../hooks/ogame'
import { useMetalContract, useCrystalContract, useDeuteriumContract } from '../../../hooks/erc20-resources'
import { toBN } from 'starknet/dist/utils/number';
import { uint256ToBN } from 'starknet/dist/utils/uint256'
import { Resource } from '@custom-types/ogame'

export default function CollectResourcesButton() {
    const { contract: ogame } = useOgameContract()
    const { invoke, data, loading, error } = useStarknetInvoke({
        contract: ogame,
        method: 'collect_resources'
    });

    return (
        <>
            <Button
                onClick={() => invoke({ args: [] })}
                isLoading={loading}
            >
                Collect
            </Button>
        </>
    )
}
