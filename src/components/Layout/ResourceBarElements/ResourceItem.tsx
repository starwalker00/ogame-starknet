import {
    Box,
    Stack,
    Heading,
    Skeleton,
    keyframes
} from '@chakra-ui/react';

import { toBN } from 'starknet/dist/utils/number';
import { uint256ToBN } from 'starknet/dist/utils/uint256'

export default function ResourceItem({ type, erc20Balance, availableBalance, loadingAvailable, loadingErc20 }: any) {

    let erc20BalanceValue = erc20Balance ? uint256ToBN(erc20Balance?.[0])?.toString(10) : undefined
    let availableBalanceValue = availableBalance ? toBN(availableBalance)?.toString(10) : undefined

    // briefly lighten when value change
    const transi = keyframes`
        0%     {background-color:inherit;}
        50.0%  {background-color:#EEE;}
        100.0%  {background-color:inherit;}
        `;
    const animation = `${transi} 1s linear`;
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
                            // key prop necessary to animate on change
                            <Box animation={animation} key={erc20BalanceValue}>{erc20BalanceValue}</Box>
                    }
                    {
                        loadingAvailable || !availableBalance
                            ?
                            <Skeleton>placeholder</Skeleton>
                            :
                            // key prop necessary to animate on change
                            <Box animation={animation} key={availableBalanceValue}>{availableBalanceValue}</Box>
                    }
                </Stack>
            </Box>
        </>
    )
}
