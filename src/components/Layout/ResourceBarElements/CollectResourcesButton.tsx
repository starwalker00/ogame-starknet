import { Button } from '@chakra-ui/react';
import { useOgameContract } from 'src/hooks/ogame'
import { useStarknetInvoke } from '@starknet-react/core';

export default function CollectResourcesButton() {
    const { contract: ogame } = useOgameContract()
    const { invoke, data, loading, error } = useStarknetInvoke({
        contract: ogame,
        method: 'collect_resources'
    });

    return (
        <>
            <Button
                onClick={() => invoke({ args: [] })}
                isLoading={loading}
            >
                Collect
            </Button>
        </>
    )
}
