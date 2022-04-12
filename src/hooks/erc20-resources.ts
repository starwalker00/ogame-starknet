import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'

import Erc20Abi from 'src/abi/erc20.json'

export function useMetalContract() {
    return useContract({
        abi: Erc20Abi as Abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ERC20_METAL,
    })
}

export function useCrystalContract() {
    return useContract({
        abi: Erc20Abi as Abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ERC20_CRYSTAL,
    })
}

export function useDeuteriumContract() {
    return useContract({
        abi: Erc20Abi as Abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ERC20_DEUTERIUM,
    })
}
