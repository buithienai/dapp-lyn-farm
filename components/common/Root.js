import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from "react-toastify";
import * as appAction from '../../redux/actions/appActions';
import './styles/ReactToastify.scss';

class Root extends Component {
	componentDidMount() {
		if (window.ethereum !== undefined) {
			window.ethereum.autoRefreshOnNetworkChange = false;
		}
	}

	render() {
		return (
			<>
				<ToastContainer
					position="bottom-center"
					pauseOnFocusLoss={false}
					hideProgressBar={true}
				/>
			</>
		);
	}
}

const mapStateToProps = state => ({
	contractReducer: state.contractReducer,
	userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
	createContract: () => dispatch(appAction.createContract()),
	updatedDataUser: (data) => dispatch(appAction.updatedDataUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);