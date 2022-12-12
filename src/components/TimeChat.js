import React, { useEffect, useState } from 'react';
import { Text } from 'native-base';

const TimeChat = ({ time }) => {
    const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    if (new Date(time).toLocaleDateString() === new Date().toLocaleDateString())
        return (
            <Text fontSize="10px">
                {new Date(time).toLocaleTimeString().slice(0, -3)}
            </Text>
        );
    return (
        <Text fontSize="10px">
            {month[new Date(time).getMonth()]} {new Date(time).getDate()}
            {', '}
            {new Date(time).toLocaleTimeString().slice(0, -3)}
        </Text>
    );
};

export default TimeChat;
