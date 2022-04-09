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
    // console.log(buildTime);

    let isBuilding = buildTime?.isAfter(now);
    // buildTime workflow :
    // when upgrade_start is called, buildTime is in the future
    // when buildTime is in the past, user can call upgrade_complete
    // upgrade_complete reset buildtime to 0

    // in essence :
    // a structure is ready to upgrade_start = buildtime is zero (buildqueue for every building is false)
    // a structure is building = buildtime is in future and buildqueue value for this struct is true, can't build anything else in the meantime
    // a structure is ready to upgrade_complete = buildtime is in past but not zero and buildqueue value is true, can't build anything else in the meantime

    return (
        <>
            <Box p={0} shadow='md' borderWidth='1px'>
                {
                    !buildTime
                        ? <Skeleton>building until xxxxxxxxxxxxxxxxxxxxxxxxx</Skeleton>
                        : isBuilding
                            ? <Text>Building until {buildTime.toString()}</Text>
                            : <Text>Nothing is being built</Text>
                }
            </Box>
        </>
    )
}
