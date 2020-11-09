import React from 'react';
import '../styles/loading.scss';

const Loading = (props) => {
    if (props.isLoading) {
        return (
            <div className={props.classes}>
                <div className="la-ball-scale-pulse"
                    style={{
                        color: props.color
                    }}
                >
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }

    return null;
}

export default Loading;