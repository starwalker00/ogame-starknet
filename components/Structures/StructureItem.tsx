import { Center, Container, Heading, Stack, Button, Skeleton } from '@chakra-ui/react'
import { VStack, Flex, Text, Box } from '@chakra-ui/react'
import { Structure } from '@custom-types/ogame';

interface StructureProps {
    structure: Structure,
}

export default function StructureItem({ structure }: StructureProps) {
    const hasLevel = Boolean(structure.level);
    const hasUpgradeCosts = structure.upgrade_costs.metal && structure.upgrade_costs.crystal && structure.upgrade_costs.deuterium
    return (
        <>
            <Box p={5} shadow='md' borderWidth='1px'>
                <Heading fontSize='xl'>{structure.name}</Heading>
                {
                    !hasLevel
                        ? <Skeleton>level{' '}10</Skeleton>
                        : <Text mt={4}>level{' '}{structure.level.toString(10)}</Text>
                }
                <Box>
                    <Heading size='xs'>Costs to upgrade :</Heading>
                    {
                        !hasUpgradeCosts
                            ?
                            < Stack direction='row'>
                                <Skeleton>XXXX{' '}metal</Skeleton>
                                <Skeleton>XXXX{' '}crystal</Skeleton>
                                <Skeleton>XXXX{' '}deuterium</Skeleton>
                            </Stack>
                            :
                            < Stack direction='row'>
                                <Text>{structure.upgrade_costs.metal.toString(10)}{' '}metal</Text>
                                <Text>{structure.upgrade_costs.crystal.toString(10)}{' '}crystal</Text>
                                <Text>{structure.upgrade_costs.deuterium.toString(10)}{' '}deuterium</Text>
                            </Stack>
                    }
                    <Stack direction='row'>
                        <Button>Start upgrade</Button>
                        <Button>Complete upgrade</Button>
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
