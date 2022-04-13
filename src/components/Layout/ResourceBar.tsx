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
import { useStarknet, useStarknetCall, useStarknetInvoke, useStarknetTransactionManager } from '@starknet-react/core'
import { useOgameContract } from 'src/hooks/ogame'
import { useMetalContract, useCrystalContract, useDeuteriumContract } from 'src/hooks/erc20-resources'
import { toBN } from 'starknet/dist/utils/number';
import { Resource } from 'src/custom-types/ogame'
import ResourceItem from './ResourceBarElements/ResourceItem';
import CollectResourcesButton from './ResourceBarElements/CollectResourcesButton';
import { useEffect } from 'react';

export default function ResourceBar() {

    // refresh data on transactions updates
    const { transactions } = useStarknetTransactionManager();
    useEffect(() => {
        console.log("Refresh ResourceBar");
        refreshResourcesAvailable();
        refreshMetal();
        refreshCrystal();
        refreshDeuterium();
    }, [transactions]);

    const { account } = useStarknet();
    const hasAccount = Boolean(account);
    const { contract: ogame } = useOgameContract()
    const { data, loading, error, refresh: refreshResourcesAvailable } = useStarknetCall({
        contract: ogame,
        method: 'resources_available',
        args: account ? [account] : undefined
    })
    const { contract: metalContract } = useMetalContract()
    const { data: metalBalance, loading: loadingMetal, error: errorMetal, refresh: refreshMetal } = useStarknetCall({
        contract: metalContract,
        method: 'balanceOf',
        args: account ? [account] : undefined,
    })
    const { contract: crystalContract } = useCrystalContract()
    const { data: crystalBalance, loading: loadingCrystal, error: errorCrystal, refresh: refreshCrystal } = useStarknetCall({
        contract: crystalContract,
        method: 'balanceOf',
        args: account ? [account] : undefined,
    })
    const { contract: deuteriumContract } = useDeuteriumContract()
    const { data: deuteriumBalance, loading: loadingDeuterium, error: errorDeuterium, refresh: refreshDeuterium } = useStarknetCall({
        contract: deuteriumContract,
        method: 'balanceOf',
        args: account ? [account] : undefined,
    })

    const colorModeValue = useColorModeValue('gray.300', 'gray.600');
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
                bg={colorModeValue}
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
                        key={Resource.Metal}
                        type={Resource.Metal}
                        erc20Balance={metalBalance}
                        loadingErc20={loadingMetal}
                        availableBalance={data?.[0]}
                        loadingAvailable={loading}
                    ></ResourceItem>
                    <ResourceItem
                        key={Resource.Crystal}
                        type={Resource.Crystal}
                        erc20Balance={crystalBalance}
                        loadingErc20={loadingCrystal}
                        availableBalance={data?.[1]}
                        loadingAvailable={loading}
                    ></ResourceItem>
                    <ResourceItem
                        key={Resource.Deuterium}
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
                                    <Skeleton><Box>XXXX</Box></Skeleton>
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
