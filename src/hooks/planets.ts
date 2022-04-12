import { useStarknetCall } from "@starknet-react/core";
import { useOgameContract } from "src/hooks/ogame";
import { uint256ToBN } from 'starknet/dist/utils/uint256'

export const usePlanets = (account: string) => {
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'owner_of',
        args: account ? [account] : undefined,
    })

    let planetID = data ? uint256ToBN(data?.[0]) : undefined

    return [planetID, loading] as const;
};
