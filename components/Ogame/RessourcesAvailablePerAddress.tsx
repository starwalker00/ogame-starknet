import { useStarknet, useStarknetCall, useStarknetInvoke } from '@starknet-react/core'
import { useOgameContract } from '../../hooks/ogame'
import { uint256ToBN } from 'starknet/dist/utils/uint256'
import { toBN } from 'starknet/dist/utils/number'

const resourcesLabel = ['metal', 'crystal', 'deuterium', 'energy'];

export function RessourcesAvailablePerAddress() {
    const { account } = useStarknet()
    const { contract: ogame } = useOgameContract()
    const { data, loading, error } = useStarknetCall({
        contract: ogame,
        method: 'resources_available',
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
            {console.log('resources')}
            {console.log(data)}
            {
                <>
                    <div>
                        {resourcesLabel[0]} {toBN(data?.[0]).toString(10)}
                    </div>
                    <div>
                        {resourcesLabel[1]} {toBN(data?.[1]).toString(10)}
                    </div>
                    <div>
                        {resourcesLabel[2]} {toBN(data?.[2]).toString(10)}
                    </div>
                    <div>
                        {resourcesLabel[3]} {toBN(data?.[3])?.toString(10)}
                    </div>
                </>
            }
        </div>
    )
}
