import {
    Box,
    Flex,
    HStack,
    Stack,
    Heading,
    Skeleton,
    Divider,
    Spacer,
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
    const hasAccount = Boolean(account);
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

    const coloModeValue = useColorModeValue('gray.300', 'gray.600');
    if (!hasAccount) {
        return (null)
        // return (
        //     <Box
        //         bg={useColorModeValue('gray.400', 'gray.500')}
        //         width='80%'
        //         mx='auto' my='20px'
        //         px='auto' py='12px'
        //     >
        //         <Flex height={16} margin='auto' alignItems={'center'} justifyContent={'center'}>
        //         </Flex>
        //     </Box>
        // )
    }
    return (
        <>
            <Box
                bg={coloModeValue}
                width={{ base: '90%', md: '70%' }}
                mx='auto' my='20px'
                px='auto' py='12px'
                rounded={'xl'}
                boxShadow={'sm'}
            >
                <HStack
                    height={16}
                    width={'full'}
                    margin='auto'
                    alignItems={'center'}
                    justifyContent={'center'}
                    spacing={{ base: 2, md: 8 }}>
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
                    <Box>
                        <CollectResourcesButton />
                    </Box>
                </HStack>
            </Box>
        </>
    );
}
