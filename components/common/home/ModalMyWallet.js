import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as appAction from '../../../redux/actions/appActions';
import configs from '../../../configs';

class ModalMyWallet extends Component {
    handleClose = () => {
        this.props.updatedDataUser({ isModalMyWallet: false });
    }

    handleSignOut = () => {
        this.props.updatedDataUser({
            isModalMyWallet: false,
            address: ''
        });

        this.props.updateDataContract({
            chainId: ''
        });
    }

    render() {
        const { isModalMyWallet, address } = this.props.userReducer;

        return (
            <Modal show={isModalMyWallet} onHide={this.handleClose} className="modal-popup modal-my-wallet">
                <div className="modal-content">
                    <h5 className="modal-title">My Account</h5>
                    <div className="modal-body">
                        <div className="content-my-account">
                            <div className="thumb">
                                🍣
                            </div>
                            <div className="number-balance">0</div>
                            <div className="text-balance">SUSHI Balance</div>
                            <a
                                className="btn btn-web"
                                href={`${configs.linkEtherscan}address/${address}`}
                                target="_blank"
                            >
                                View etherscan
                            </a>
                            <a
                                className="btn btn-web"
                                onClick={this.handleSignOut}>
                                Sign out
                            </a>
                        </div>
                        <a
                            className="btn btn-web close"
                            onClick={this.handleClose}
                        >Cancel</a>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    updatedDataUser: (data) => dispatch(appAction.updatedDataUser(data)),
    updateDataContract: (data) => dispatch(appAction.updateDataContract(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMyWallet);