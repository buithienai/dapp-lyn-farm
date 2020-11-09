import React from 'react';
import Countdown from 'react-countdown-now';
import { makeMeTwoDigits } from '../../utils/common';
import moment from 'moment';

export function CountDownOpen(props) {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                <span />
            );
        }

        return (
            <div className="count-down">
                <div className="text-center">
                    <div className="text-title">Open in</div>
                    <div className="text-time">{renderHours(days, hours)}:{makeMeTwoDigits(minutes)}:{makeMeTwoDigits(seconds)}</div>
                </div>
            </div>
        );
    };

    const renderHours = (days, hours) => {
        if (days > 0) {
            return (
                <>{makeMeTwoDigits(days * 24 + hours)}</>
            );
        }

        return (
            <>{makeMeTwoDigits(hours)}</>
        );
    }

    return (
        <Countdown
            date={moment(props.date)}
            renderer={renderer}
        />
    )
}

export default CountDownOpen;