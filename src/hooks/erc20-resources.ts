import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import Erc20Abi from 'src/abi/erc20.json'

export function useMetalContract() {
    return useContract({
        abi: Erc20Abi as Abi,
        address: '0x005bf547b2f661336e9f8922ec2a70d7d54654796f3c15bac1c1b0b7741c6e29',
    })
}

export function useCrystalContract() {
    return useContract({
        abi: Erc20Abi as Abi,
        address: '0x000dd0a85312bf09bc30f1328b1f3264f3757a1d539fb337aff6bffa0eb474d1',
    })
}

export function useDeuteriumContract() {
    return useContract({
        abi: Erc20Abi as Abi,
        address: '0x008f5fb6ccc1be7385651fdf63aacb24858350b477212a9b1f056225ff9473a6',
    })
}
