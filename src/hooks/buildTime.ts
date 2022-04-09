import { useStarknetCall } from "@starknet-react/core";
import { useOgameContract } from "src/hooks/ogame";
import { toBN } from "starknet/dist/utils/number";
import dayjs from "dayjs";

export const useBuildTime = (account: string) => {
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'build_time_completion',
        args: account ? [account] : undefined,
    })

    let buildTime = data?.[0] ? dayjs.unix(toBN(data?.[0]).toString(10)) : undefined;

    return [buildTime] as const;
};
