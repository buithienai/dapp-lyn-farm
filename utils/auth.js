import Router from 'next/router';
import nextCookie from 'next-cookies';
import { Component } from 'react';

export const auth = ctx => {
    const { accessToken } = nextCookie(ctx);

    if (ctx.req && !accessToken) {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
        return;
    }

    if (!accessToken) {
        Router.push('/');
    }

    return accessToken;
}

const getDisplayName = Component =>
    Component.displayName || Component.name || 'Component'

export const withAuthSync = WrappedComponent =>
    class extends Component {
        static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

        static async getInitialProps(ctx) {
            const accessToken = auth(ctx)

            const componentProps =
                WrappedComponent.getInitialProps &&
                (await WrappedComponent.getInitialProps(ctx))

            return { ...componentProps, accessToken }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }