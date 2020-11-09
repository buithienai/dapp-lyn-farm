import React from 'react';
import '../styles/loadingConnect.scss';

const LoadingConnect = (props) => {
    return (
        <div className="loading-connect">
            <div className="la-ball-spin-clockwise-fade"
                style={{
                    color: props.color
                }}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default LoadingConnect;