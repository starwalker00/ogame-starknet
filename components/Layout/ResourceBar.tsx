import {
    Box,
    Flex,
    HStack,
    Link,
    Button,
    Stack,
    Heading,
    Skeleton,
    useColorModeValue,
} from '@chakra-ui/react';
import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from '../../hooks/ogame'
import { useMetalContract, useCrystalContract, useDeuteriumContract } from '../../hooks/erc20-resources'
import { toBN } from 'starknet/dist/utils/number';
import { Resource } from '@custom-types/ogame'
import ResourceItem from './ResourceBarElements/ResourceItem';
import CollectResourcesButton from './ResourceBarElements/CollectResourcesButton';

export default function ResourceBar() {
    const { account } = useStarknet();
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'resources_available',
        args: account ? [account] : undefined
    })
    const { contract: metalContract } = useMetalContract()
    const { data: metalBalance, loading: loadingMetal, error: errorMetal } = useStarknetCall({
        contract: metalContract,
        method: 'balanceOf',
        args: account ? [account] : undefined,
    })
    const { contract: crystalContract } = useCrystalContract()
    const { data: crystalBalance, loading: loadingCrystal, error: errorCrystal } = useStarknetCall({
        contract: crystalContract,
        method: 'balanceOf',
        args: account ? [account] : undefined,
    })
    const { contract: deuteriumContract } = useCrystalContract()
    const { data: deuteriumBalance, loading: loadingDeuterium, error: errorDeuterium } = useStarknetCall({
        contract: deuteriumContract,
        method: 'balanceOf',
        args: account ? [account] : undefined,
    })

    return (
        <>
            <Box bg={useColorModeValue('gray.400', 'gray.500')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'center'}>
                    <HStack spacing={8} alignItems={'center'}>
                        {console.log(metalBalance)}
                        <ResourceItem
                            type={Resource.Metal}
                            erc20Balance={metalBalance}
                            loadingErc20={loadingMetal}
                            availableBalance={data?.[0]}
                            loadingAvailable={loading}
                        ></ResourceItem>
                        <ResourceItem
                            type={Resource.Crystal}
                            erc20Balance={crystalBalance}
                            loadingErc20={loadingCrystal}
                            availableBalance={data?.[1]}
                            loadingAvailable={loading}
                        ></ResourceItem>
                        <ResourceItem
                            type={Resource.Deuterium}
                            erc20Balance={deuteriumBalance}
                            loadingErc20={loadingDeuterium}
                            availableBalance={data?.[2]}
                            loadingAvailable={loading}
                        ></ResourceItem>
                        {/* custom component needed because no erc20 for energy */}
                        <Box>
                            <Stack direction='column' spacing={0} alignItems={'center'}>
                                <Heading size='xs'>{Resource.Energy}</Heading>
                                {
                                    loading || !data?.[3]
                                        ?
                                        <Skeleton>placeholder</Skeleton>
                                        :
                                        <Box>{toBN(data?.[3])?.toString(10)}</Box>
                                }
                            </Stack>
                        </Box>
                        <CollectResourcesButton />
                    </HStack>
                </Flex>
            </Box>
        </>
    );
}
