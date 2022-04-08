import type { NextPageWithLayout } from '@custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from '@components/Layout'
import { ResourceBar } from '@components/Layout'
import { Center, Heading } from '@chakra-ui/react'
import { VStack, Flex, Text } from '@chakra-ui/react'

import React from 'react'
import { PlanetTotalAmount } from '@components/Ogame/PlanetTotalAmount'
import { PlanetIDOwnedPerAddress } from '@components/Ogame/PlanetIDOwnedPerAddress'
import { RessourcesAvailablePerAddress } from '@components/Ogame/RessourcesAvailablePerAddress'
import { StructuresLevelsPerAddress } from '@components/Ogame/StructuresLevelsPerAddress'
import { StructuresUpgradeCostPerAddress } from '@components/Ogame/StructuresUpgradeCostPerAddress'
import { GeneratePlanet } from '@components/Ogame/GeneratePlanet'
import { BuildTimeCompletionPerAddress } from '@components/Ogame/BuildTimeCompletionPerAddress'

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Center>
                <Heading>Home</Heading>
            </Center>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            <ResourceBar />
            {page}
        </Layout>
    )
}

export default Home
