import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from '../utils/cookie';

export default function (ctx) {

	if (ctx.isServer) {
		if (ctx.req.headers.cookie) {
			ctx.store.dispatch(actions.reauthenticate(getCookie('accessToken', ctx.req)));
		}
	} else {
		const accessToken = ctx.store.getState().authentication.accessToken;

		if (accessToken && (ctx.pathname === '/' || ctx.pathname === '/')) {
			setTimeout(function () {
				Router.push('/');
			}, 0);
		}
	}
}