// @ts-nocheckhh
import type { AppPropsWithLayout, NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import NextLink from "next/link"
import { Layout, Navbar } from 'src/components/Layout'
import { Container, Center, Stack, Heading, Text, Link } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { namedConsoleLog, truncateEthAddress } from 'src/lib/helper'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // import plugin
dayjs.extend(relativeTime); // use plugin

type LeaderboardType = {
    updatedAt: string;
    leaders: Leaders[];
}
type Leaders = {
    owner: string;
    points: string;
}

interface LeaderboardProps {
    leaderboard: LeaderboardType,
}

const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
    // date management
    const updatedAt = leaderboard?.updatedAt;
    const updatedAtDate = new Date(updatedAt);
    const updatedAtDayjs = dayjs(updatedAtDate);
    const now = dayjs();
    const relativeUpdatedAtDayjs = updatedAtDayjs?.from(now);

    // leaders
    const leaders = leaderboard?.leaders;
    const hasLeaders = leaders?.length > 0;
    return (
        <>
            <Container maxW={'4xl'} px={0} py={12} border='2px solid teal'>
                <Heading px={12}>Leaderboard</Heading>
                <Center py={12}>
                    <Stack direction="column" spacing={1}>
                        <TableContainer>
                            <Table variant='simple'>
                                <TableCaption>Last update :
                                    <br />{updatedAtDayjs.format('DD/MM/YYYY HH:mm:ss')}
                                    <br />{relativeUpdatedAtDayjs}
                                </TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Points</Th>
                                        <Th>Owner</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        hasLeaders &&
                                        leaders.map(
                                            leader =>
                                            (
                                                <Tr key={leader.owner}>
                                                    <Td>{leader.points}</Td>
                                                    <Td>{truncateEthAddress(leader.owner)}</Td>
                                                </Tr>
                                            )
                                        )
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Center>
            </Container>
        </>
    )
}

Leaderboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}

export const getStaticProps = async () => {
    const res = await fetch(process.env.LEADERBOARD_DATA_ENDPOINT || "https://raw.githubusercontent.com/starwalker00/ogame-starknet-data/main/main.json");
    const leaderboard: LeaderboardType = await res.json();
    namedConsoleLog("leaderboard", leaderboard);
    return {
        props: {
            leaderboard: leaderboard,
        },
        revalidate: 600
    }
}

export default Leaderboard
