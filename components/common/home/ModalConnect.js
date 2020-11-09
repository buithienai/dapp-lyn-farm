import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { isAndroid, isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { convertWeiBigNumberToNumber } from '../../../commons/web3js';
import configs from '../../../configs';
import * as appAction from '../../../redux/actions/appActions';
var abi = require('ethereumjs-abi');

class ModalConnect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    handleConnectMetamask = () => {
        if (window.ethereum !== undefined) {
            window.ethereum.isConnected();

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async (accounts) => {
                    if (accounts.length === 0) {
                        console.log("Please connect to Binance Smart Chain!");
                    } else {
                        const address = accounts[0];
                        this.props.updatedDataUser({
                            address
                        });

                        window.ethereum
                            .request({ method: 'eth_chainId' })
                            .then(async (chainId) => {
                                const chain_id = window.ethereum.isMetaMask === true ? chainId : chainId.substring(2, chainId.length);
                                this.props.updateDataContract({
                                    chainId: chain_id,
                                    binanceChain: window.ethereum
                                });
                                if (configs.chainId.includes(chain_id)) {
                                    await this.getTotalSupply(window.ethereum);
                                    await this.getBalanceSuShi(window.ethereum);
                                    this.handleClose();
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                            });

                        window.ethereum.on('accountsChanged', (accounts) => {
                            window.location.reload();
                        });

                        window.ethereum.on('chainChanged', () => {
                            window.location.reload();
                        });
                    }
                })
                .catch((err) => {
                    if (err.code === 4001) {
                        console.log('Please connect to MetaMask.');
                    } else {
                        console.error(err);
                    }
                });

            window.ethereum
                .request({ method: 'eth_chainId' })
                .then(async (chainId) => {
                    if (this.props.userReducer.address) {
                        const chain_id = window.ethereum.isMetaMask === true ? chainId : chainId.substring(2, chainId.length);
                        this.props.updateDataContract({
                            chainId: chain_id,
                            binanceChain: window.ethereum
                        });
                        if (configs.chainId.includes(chain_id)) {
                            await this.getTotalSupply(window.ethereum);
                            await this.getBalanceSuShi(window.ethereum);
                            this.handleClose();
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            let link = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";

            if (isMobile) {
                link = "https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=845470809737790787";

                if (isAndroid) {
                    link = "https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=845470809737790787";
                }
            }

            window.open(link, '_blank');
        }
    }

    getTotalSupply = async (binanceChain) => {
        const data = abi.simpleEncode(
            'totalSupply()',
        );

        const { sushiToken } = configs.contracts;

        let params = [
            {
                from: this.props.userReducer.address,
                to: sushiToken.address,
                data: '0x' + Buffer.from(data).toString('hex')
            },
            "latest"
        ];

        try {
            let totalSupply = await binanceChain
                .request({
                    method: 'eth_call',
                    params,
                });

            // console.log('totalSupply', totalSupply);

            totalSupply = convertWeiBigNumberToNumber(totalSupply);

            // console.log('totalSupply', totalSupply);

            this.props.updatedDataUser({
                totalSupply
            });
        } catch (error) {
            console.log('error balanceOf', error);
        }
    }

    getBalanceSuShi = async (binanceChain) => {
        const data = abi.simpleEncode(
            'balanceOf(address)',
            this.props.userReducer.address
        );

        const { sushiToken } = configs.contracts;

        let params = [
            {
                from: this.props.userReducer.address,
                to: sushiToken.address,
                data: '0x' + Buffer.from(data).toString('hex')
            },
            "latest"
        ];

        try {
            let balance = await binanceChain
                .request({
                    method: 'eth_call',
                    params,
                });

            // console.log('balanceSuShi', balance);

            balance = convertWeiBigNumberToNumber(balance);

            // console.log('balanceSuShi', balance);

            this.props.updatedDataUser({
                balanceSuShi: balance
            });
        } catch (error) {
            console.log('error balanceOf', error);
        }
    }

    handleClose = () => {
        this.props.updatedDataUser({ isModalConnect: false });
    }

    render() {
        const { isModalConnect } = this.props.userReducer;

        return (
            <Modal show={isModalConnect} onHide={this.handleClose} className="modal-popup modal-my-wallet">
                <div className="modal-content">
                    <h5 className="modal-title">Select a wallet provider</h5>
                    <div className="modal-body">
                        <div className="detect-connect">
                            <div className="item">
                                <div className="thumb">
                                    <img src="../../static/img/metamask.svg" />
                                </div>
                                <div className="text">Metamask</div>
                                <a
                                    className="btn btn-web"
                                    onClick={this.handleConnectMetamask}>
                                    Connect
                                </a>
                            </div>
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
    contractReducer: state.contractReducer,
    userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
    updatedDataUser: (data) => dispatch(appAction.updatedDataUser(data)),
    updateDataContract: (data) => dispatch(appAction.updateDataContract(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalConnect);