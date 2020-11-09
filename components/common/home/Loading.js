import React from 'react';
import '../styles/loading.scss';

const Loading = (props) => {
    if (props.isLoading) {
        return (
            <div className="loading-page">
                <div className="la-ball-clip-rotate">
                    <div></div>
                    <img src="../../static/img/logo.png" />
                </div>
            </div>
        );
    }

    return null;
}

export default Loading;