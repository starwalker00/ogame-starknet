import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from '../../hooks/ogame'
import { toBN } from 'starknet/dist/utils/number'

const structuresLabel = ['metal_mine', 'crystal_mine', 'deuterium_mine', 'solar_plant', 'robot_factory'];

export function StructuresLevelsPerAddress() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'get_structures_levels',
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
            {console.log('structures')}
            {console.log(data)}
            {
                data && data.map((structure, index) =>
                    <div>{structuresLabel[index]}{' level '}{toBN(structure).toString(10)}</div>
                )
            }
        </div>
    )
}
