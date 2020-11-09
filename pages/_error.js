import React from 'react'
import ErrorComponent from '../components/error/Index';

function Error({ statusCode }) {
    return (
        <>
            {statusCode
                ? <ErrorComponent />
                : 'An error occurred on client'}
        </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error;