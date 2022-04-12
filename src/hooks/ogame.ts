import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import OgameAbi from 'src/abi/ogame.json'

export function useOgameContract() {
    return useContract({
        abi: OgameAbi as Abi,
        address: process.env.CONTRACT_OGAME,
    })
}
