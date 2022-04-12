import { Button } from '@chakra-ui/react';
import { useOgameContract } from 'src/hooks/ogame'
import { useStarknetInvoke } from '@starknet-react/core';

export default function ColonizePlanetButton() {
    const { contract: ogame } = useOgameContract()
    const { invoke, data, loading, error } = useStarknetInvoke({
        contract: ogame,
        method: 'generate_planet'
    });

    return (
        <>
            <Button
                onClick={() => invoke({ args: [] })}
                isLoading={loading}
            >
                Colonize a planet
            </Button>
        </>
    )
}