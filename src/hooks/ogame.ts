import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import OgameAbi from '../abi/ogame.json'

export function useOgameContract() {
    return useContract({
        abi: OgameAbi as Abi,
        address: '0x03763a8330144f3552ba10e36fcf52fb002a338ff55ecb842d5282e0a6fb1226',
    })
}
