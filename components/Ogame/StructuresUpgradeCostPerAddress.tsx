import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from '../../hooks/ogame'

const structuresUpgradeCostLabel = [
    'metal_mine.metal', 'metal_mine.crystal', ' metal_mine.deuterium',
    'crystal_mine.metal', 'crystal_mine.crystal', ' crystal_mine.deuterium',
    'deuterium_mine.metal', 'deuterium_mine.crystal', ' deuterium_mine.deuterium',
    'solar_plant.metal', 'solar_plant.crystal', ' solar_plant.deuterium',
    'robot_factory.metal', 'robot_factory.crystal', ' robot_factory.deuterium',
];

export function StructuresUpgradeCostPerAddress() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'get_structures_upgrade_cost',
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
            {console.log('structures upgrade cost')}
            {console.log(data)}
            {/* {
                data && data.map((structure, index) =>
                    <div>{structuresUpgradeCostLabel[index]}{' '}{toBN(structure).toString(10)}</div>
                )
            } */}
        </div>
    )
}
