import { Center, Container, Heading, Stack, Button, Skeleton } from '@chakra-ui/react';
import { VStack, Flex, Text, Box, Image, Divider, Spacer, Tooltip } from '@chakra-ui/react';
import { useTimer } from 'react-timer-hook';
import dayjs from 'dayjs'
import { useEffect } from 'react';

interface MyTimerProps {
    expiryTimestamp: Date,
}

export default function MyTimer({ expiryTimestamp }: MyTimerProps) {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

    useEffect(() => {
        if (expiryTimestamp) {
            restart(expiryTimestamp)
        }
    }, [expiryTimestamp]);

    return (
        <Tooltip label={dayjs(expiryTimestamp)?.format('ddd DD/MM/YYYY HH:mm:ss')}>
            <Text>Finishes in <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></Text>
        </Tooltip>
    )
}
