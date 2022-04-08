import { Center, Container, Heading, Stack, Button, Skeleton } from '@chakra-ui/react'
import { VStack, Flex, Text, Box, Image, Divider, Spacer } from '@chakra-ui/react'
import { Structure } from '@custom-types/ogame';

import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import dayjs from 'dayjs';
import { toBN } from 'starknet/dist/utils/number';
import { useOgameContract } from '../../hooks/ogame'

interface StructureProps {
    structure: Structure,
}

export default function BuildStatus() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'build_time_completion',
        args: account ? [account] : undefined,
    })
    let now = dayjs();
    let buildTime = data?.[0] ? dayjs.unix(toBN(data?.[0]).toString(10)) : undefined;
    console.log(buildTime);

    let isBuilding = buildTime?.isAfter(now);

    return (
        <>
            <Box p={0} shadow='md' borderWidth='1px'>
                {
                    !buildTime
                        ? <Skeleton>building until xxxxxxxxxxxxxxxxxxxxxxxxx</Skeleton>
                        : isBuilding
                            ? <Text>building until {buildTime.toString()}</Text>
                            : <Text>finished building {buildTime.toString()}</Text>
                }
            </Box>
        </>
    )
}
