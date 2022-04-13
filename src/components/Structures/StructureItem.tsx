import { Center, Container, Heading, Stack, Button, Skeleton } from '@chakra-ui/react'
import { VStack, Flex, Text, Box, Image, Divider, Spacer, Tag, Badge, Tooltip } from '@chakra-ui/react'
import { Structure } from 'src/custom-types/ogame';

import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from 'src/hooks/ogame'

import dayjs from "dayjs";
import MyTimer from './MyTimer';
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
import { namedConsoleLog } from 'src/lib/helper';
dayjs.extend(relativeTime); // use plugin

interface StructureProps {
    structure: Structure,
    buildTime: dayjs.Dayjs | undefined,
    isUpgradingAny: boolean
}

export default function StructureItem({ structure, buildTime, isUpgradingAny }: StructureProps) {
    const hasLevel = Boolean(structure.level);
    const hasUpgradeMethods = Boolean(structure.upgrade_methods.start) && Boolean(structure.upgrade_methods.complete);
    const hasUpgradeCosts = structure.upgrade_costs.metal && structure.upgrade_costs.crystal && structure.upgrade_costs.deuterium

    // upgrade write
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { invoke: invokeUpgradeStart, data, loading, error } = useStarknetInvoke({
        contract: ogame,
        method: hasUpgradeMethods ? structure.upgrade_methods.start : ""
    });
    const { invoke: invokeUpgradeComplete } = useStarknetInvoke({
        contract: ogame,
        method: hasUpgradeMethods ? structure.upgrade_methods.complete : ""
    });

    // buildTime countdown
    let now: dayjs.Dayjs = dayjs();
    let isReadyToComplete = buildTime?.isBefore(now);
    let time = buildTime?.toDate() ?? undefined;
    // namedConsoleLog("time", time)

    return (
        <>
            <Box p={0} shadow='md' borderWidth='1px'>
                <Stack direction={{ base: 'column', md: 'row' }}>
                    <Image
                        boxSize={{ base: '30%', md: '180px' }}
                        alignSelf='center'
                        src={structure.imageSrc}
                        alt={structure.name}
                    />
                    <Stack direction='column' width={'full'} p={2}>
                        <Stack direction='row' alignItems={'baseline'}>
                            <Heading fontSize='xl'>{structure.name}</Heading>
                            {
                                !hasLevel
                                    ? <Skeleton>level{' '}10</Skeleton>
                                    :
                                    <>
                                        <Text>level{' '}{structure.level.toString(10)}</Text>
                                        <Spacer />
                                        {
                                            structure.isUpgrading ?
                                                isReadyToComplete
                                                    ?
                                                    <Tooltip label={<span>Finishes {buildTime?.format('ddd DD/MM/YYYY HH:mm:ss')}</span>}>
                                                        <Tag colorScheme="yellow">Upgrading</Tag>
                                                    </Tooltip>
                                                    :
                                                    <Tooltip label={<span>Finished {buildTime?.format('ddd DD/MM/YYYY HH:mm:ss')}</span>}>
                                                        <Tag colorScheme="yellow">Ready to complete</Tag>
                                                    </Tooltip>
                                                : null
                                        }
                                    </>
                            }
                        </Stack>
                        <Divider orientation='horizontal' />
                        <Box>
                            <Text color='gray.500'>
                                {structure.description}
                            </Text>
                        </Box>
                        <Divider orientation='horizontal' />
                        <Stack direction={{ base: 'column', md: 'row' }} alignItems={'center'}>
                            <Stack direction='row' alignItems={'center'}>
                                <Heading size='xs' textAlign={'center'}>Upgrade <br />for :</Heading>
                                {
                                    !hasUpgradeCosts
                                        ?
                                        < Stack direction='row'>
                                            <Skeleton>XXXX{' '}metal</Skeleton>
                                            <Skeleton>XXXX{' '}crystal</Skeleton>
                                            <Skeleton>XXXX{' '}deuterium</Skeleton>
                                        </Stack>
                                        :
                                        <Stack direction='row'>
                                            <Text textAlign='center'>{structure.upgrade_costs.metal.toString(10)}<br />metal</Text>
                                            <Text textAlign='center'>{structure.upgrade_costs.crystal.toString(10)}<br />crystal</Text>
                                            <Text textAlign='center'>{structure.upgrade_costs.deuterium.toString(10)}<br />deuterium</Text>
                                        </Stack>
                                }
                            </Stack>
                            <Spacer />
                            {
                                structure.isUpgrading
                                    ? isReadyToComplete //
                                        ?
                                        <Stack direction='row'>
                                            <Button size='xs' onClick={() => invokeUpgradeComplete({ args: [] })}>Complete upgrade</Button>
                                        </Stack>
                                        :
                                        <Stack direction='row'>
                                            {
                                                buildTime &&
                                                //@ts-ignore
                                                <MyTimer expiryTimestamp={time} />
                                            }
                                        </Stack>
                                    : isUpgradingAny // if another structure is upgrading
                                        ?
                                        <Stack direction='row'>
                                            <Text fontSize="sm">Another structure is upgrading.</Text>
                                        </Stack>
                                        :
                                        <Stack direction='row'>
                                            <Button size='xs' onClick={() => invokeUpgradeStart({ args: [] })}>Start upgrade</Button>
                                            {/* <Button size='xs' onClick={() => invokeUpgradeComplete({ args: [] })}>Complete upgrade</Button> */}
                                        </Stack>
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}
