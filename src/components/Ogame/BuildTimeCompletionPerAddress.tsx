import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { toBN } from 'starknet/dist/utils/number';
import { useOgameContract } from 'src/hooks/ogame'

export function BuildTimeCompletionPerAddress() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'build_time_completion',
        args: [account]
    })

    if (!account) {
        return <div>Please connect Argent X</div>
    }

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error: {JSON.stringify(error)}</div>
    }

    return (
        <div>
            data:{JSON.stringify(data)}
            {console.log('build_time_completion')}
            {console.log(data)}
            <br />
            {toBN(data?.[0]).toString(10)}
        </div>
    )
}
