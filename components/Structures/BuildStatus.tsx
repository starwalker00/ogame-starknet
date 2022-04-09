import { Center, Container, Heading, Stack, Button, Skeleton } from '@chakra-ui/react';
import { VStack, Flex, Text, Box, Image, Divider, Spacer } from '@chakra-ui/react';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
dayjs.extend(relativeTime); // use plugin

interface BuildStatusProps {
    buildTime: dayjs.Dayjs | undefined,
}

export default function BuildStatus({ buildTime }: BuildStatusProps) {
    let now = dayjs();
    let isBuilding = buildTime?.isAfter(now);
    // buildTime workflow :
    // when upgrade_start is called, buildTime is in the future
    // when buildTime is in the past, user can call upgrade_complete
    // upgrade_complete reset buildtime to 0

    // in essence :
    // a structure is ready to upgrade_start = buildtime is zero (buildqueue for every building is false)
    // a structure is building = buildtime is in future and buildqueue value for this struct is true, can't build anything else in the meantime
    // a structure is ready to upgrade_complete = buildtime is in past but not zero and buildqueue value is true, can't build anything else in the meantime

    let timeToComplete: string = now.to(buildTime);

    return (
        <>
            <Box p={0} shadow='md' borderWidth='1px'>
                {
                    !buildTime
                        ? <Skeleton>building until xxxxxxxxxxxxxxxxxxxxxxxxx</Skeleton>
                        : isBuilding
                            ? <Text>Building until {buildTime.toString()}{' '}{timeToComplete}</Text>
                            : <Text>Nothing is being built</Text>
                }
            </Box>
        </>
    )
}
