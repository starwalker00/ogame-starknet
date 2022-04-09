import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from 'src/hooks/ogame'

export function GeneratePlanet() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { invoke, data, loading, error } = useStarknetInvoke({
        contract: ogame,
        method: 'generate_planet'
    });

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
            <div>
                <button onClick={() => invoke({ args: [] })}>generate_planet</button>
            </div>
        </div>
    )
}
