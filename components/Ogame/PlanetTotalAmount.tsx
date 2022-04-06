import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from '../../hooks/ogame'

export function PlanetTotalAmount() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'number_of_planets',
        args: []
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
            {console.log('planet total amount')}
            {console.log(data)}
        </div>
    )
}
