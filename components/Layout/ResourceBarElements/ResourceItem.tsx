import {
    Box,
    Stack,
    Heading,
    Skeleton
} from '@chakra-ui/react';

import { toBN } from 'starknet/dist/utils/number';
import { uint256ToBN } from 'starknet/dist/utils/uint256'

export default function ResourceItem({ type, erc20Balance, availableBalance, loadingAvailable, loadingErc20 }: any) {

    let erc20BalanceValue = erc20Balance ? uint256ToBN(erc20Balance?.[0])?.toString(10) : undefined
    let availableBalanceValue = availableBalance ? toBN(availableBalance)?.toString(10) : undefined
    return (
        <>
            <Box>
                <Stack direction='column' spacing={0} alignItems={'center'}>
                    <Heading size='xs'>{type}</Heading>
                    {
                        loadingErc20 || !erc20Balance
                            ?
                            <Skeleton>placeholder</Skeleton>
                            :
                            <Box>{erc20BalanceValue}</Box>
                    }
                    {
                        loadingAvailable || !availableBalance
                            ?
                            <Skeleton>placeholder</Skeleton>
                            :
                            <Box>{availableBalanceValue}</Box>
                    }
                </Stack>
            </Box>
        </>
    )
}
