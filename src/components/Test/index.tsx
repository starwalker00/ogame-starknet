import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from 'src/components/Layout'
import { ResourceBar } from 'src/components/Layout'
import { Center, Heading } from '@chakra-ui/react'
import { VStack, Flex, Text } from '@chakra-ui/react'

import React from 'react'
import { PlanetTotalAmount } from 'src/components/Ogame/PlanetTotalAmount'
import { PlanetIDOwnedPerAddress } from 'src/components/Ogame/PlanetIDOwnedPerAddress'
import { RessourcesAvailablePerAddress } from 'src/components/Ogame/RessourcesAvailablePerAddress'
import { StructuresLevelsPerAddress } from 'src/components/Ogame/StructuresLevelsPerAddress'
import { StructuresUpgradeCostPerAddress } from 'src/components/Ogame/StructuresUpgradeCostPerAddress'
import { GeneratePlanet } from 'src/components/Ogame/GeneratePlanet'
import { BuildTimeCompletionPerAddress } from 'src/components/Ogame/BuildTimeCompletionPerAddress'

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
