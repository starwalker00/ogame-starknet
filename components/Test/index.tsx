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

const Test: NextPageWithLayout = () => {
    return (
        <>
            <Center>
                <Heading>Test</Heading>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Flex>
                        <Text>PlanetTotalAmount :</Text>
                    </Flex>
                    <Flex>
                        <PlanetTotalAmount />
                    </Flex>
                </VStack>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Text>GeneratePlanet :</Text>
                    <GeneratePlanet />
                </VStack>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Flex>
                        <Text>PlanetIDOwnedPerAddress :</Text>
                    </Flex>
                    <Flex>
                        <PlanetIDOwnedPerAddress />
                    </Flex>
                </VStack>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Flex>
                        <Text>RessourcesAvailablePerAddress :</Text>
                    </Flex>
                    <Flex>
                        <RessourcesAvailablePerAddress />
                    </Flex>
                </VStack>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Flex>
                        <Text>StructuresLevelsPerAddress :</Text>
                    </Flex>
                    <Flex>
                        <StructuresLevelsPerAddress />
                    </Flex>
                </VStack>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Flex>
                        <Text>StructuresUpgradeCostPerAddress :</Text>
                    </Flex>
                    <Flex>
                        <StructuresUpgradeCostPerAddress />
                    </Flex>
                </VStack>
            </Center>
            <Center>
                <VStack spacing={8} p={8} border='1px solid teal'>
                    <Flex>
                        <Text>BuildTimeCompletionPerAddress :</Text>
                    </Flex>
                    <Flex>
                        <BuildTimeCompletionPerAddress />
                    </Flex>
                </VStack>
            </Center>
        </>
    )
}

Test.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            <ResourceBar />
            {page}
        </Layout>
    )
}

export default Test
