import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import { Provider } from 'react-redux';
import initStore from '../redux/store/store';
import '../static/scss/style.scss';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		return {
			pageProps: {
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {})
			}
		};
	}

	render() {
		const { Component, pageProps, store } = this.props;

		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default withRedux(initStore, { debug: false })(MyApp);
