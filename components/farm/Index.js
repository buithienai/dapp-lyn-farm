import Link from 'next/link';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { TIME_OUT_CONTRACT } from '../../commons/constants';
import { convertNumberToWei, convertWeiBigNumberToNumber } from '../../commons/web3js';
import configs from '../../configs';
import * as appAction from '../../redux/actions/appActions';
import { parseFloatFixedNoRound } from '../../utils/common';
import Layout from '../common/home/Layout';
import { data } from './farm';

var abi = require('ethereumjs-abi');

class Farm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModal: false,
            balance: 0,
            amount: 0,
            idFarm: 0,
            isApproved: false,
            openFarm: 0,
            usdtFarm: {
                myStake: 1
            },
            bscFarm: {
                myStake: 1
            }
        }
    }

    getMyStatsUSDT = (binanceChain) => {
        const data = abi.simpleEncode(
            'myStats()'
        );

        const { usdtFarm } = configs.contracts;

        let params = [
            {
                from: this.props.userReducer.address,
                to: usdtFarm.address,
                data: '0x' + Buffer.from(data).toString('hex')
            },
            "latest"
        ];

        binanceChain
            .request({
                method: 'eth_call',
                params,
            })
            .then((result) => {
                const request = result.substring(2, result.length)
                let myStake = request.substring(0, request.length / 3);
                let totalStaked = request.substring(request.length / 3, request.length / 3 * 2);
                let remaining = request.substring(request.length / 3 * 2, request.length);

                myStake = convertWeiBigNumberToNumber(myStake);
                totalStaked = convertWeiBigNumberToNumber(totalStaked);
                remaining = convertWeiBigNumberToNumber(remaining);

                // console.log('myStake', myStake);
                // console.log('totalStaked', totalStaked);
                // console.log('remaining', remaining);

                this.props.updatedDataUser({
                    usdtFarm: {
                        myStake,
                        totalStaked,
                        remaining
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getMyStatsBSC = async (binanceChain) => {
        const data = abi.simpleEncode(
            'myStats()',
        );

        const { bscFarm } = configs.contracts;

        // console.log('myStats address', this.props.userReducer.address);
        // console.log('bscFarm address', bscFarm.address);

        let params = [
            {
                from: this.props.userReducer.address,
                to: bscFarm.address,
                data: '0x' + Buffer.from(data).toString('hex')
            },
            "latest"
        ];

        try {
            let result = await binanceChain
                .request({
                    method: 'eth_call',
                    params,
                });

            const request = result.substring(2, result.length)
            let myStake = request.substring(0, request.length / 3);
            let totalStaked = request.substring(request.length / 3, request.length / 3 * 2);
            let remaining = request.substring(request.length / 3 * 2, request.length);

            myStake = convertWeiBigNumberToNumber(myStake);
            totalStaked = convertWeiBigNumberToNumber(totalStaked);
            remaining = convertWeiBigNumberToNumber(remaining);

            // console.log('myStake', myStake);
            // console.log('totalStaked', totalStaked);
            // console.log('remaining', remaining);

            this.props.updatedDataUser({
                bscFarm: {
                    myStake,
                    totalStaked,
                    remaining
                }
            });
        } catch (error) {
            console.log('error myStats', error);
        }
    }

    getBalanceUSDT = async (mUsdtContract, address) => {
        let balance = await mUsdtContract.methods.balanceOf(address).call();
        balance = convertWeiBigNumberToNumber(balance);

        this.setState({
            balanceUSDT: balance
        });
    }

    getBalanceBSC = async (bscTokenContract, address) => {
        let balance = await bscTokenContract.methods.balanceOf(address).call();
        balance = convertWeiBigNumberToNumber(balance);

        this.setState({
            balanceBSC: balance
        });
    }

    handleChange = (data) => {
        this.setState({
            ...data
        })
    }

    renderData = () => {
        let html = [];

        data.map((item, index) => {
            html.push(
                <div className={"item " + (index === 0 ? 'active' : '')} key={index}>
                    <div className="content">
                        <div className="thumb">
                            {item.img}
                        </div>
                        <h3>{item.farm}</h3>
                        <div className="title">Deposit {item.deposit}</div>
                        <div className="title">Earn {item.earn}</div>
                        <Link href="/farms/[id]" as={`/farms/${index}`}>
                            <a className="btn btn-web">Select</a>
                        </Link>
                        <div className="info">
                            <span>APY</span>
                            <span>163.75%</span>
                        </div>
                    </div>
                </div>
            );
        });

        return html;
    }

    handleApproveUSDT = async () => {
        const { address } = this.props.userReducer;
        const { binanceChain } = this.props.contractReducer;
        const { amount } = this.state;
        const { usdtFarm, mUsdt } = configs.contracts;

        this.props.updatedDataUser({
            isLoadingPage: true
        });

        const data = abi.simpleEncode(
            'approve(address,uint256):(bool)',
            usdtFarm.address,
            convertNumberToWei(amount)
        );

        binanceChain
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: mUsdt.address,
                        data: '0x' + Buffer.from(data).toString('hex'),
                    },
                ],
            })
            .then(async (response) => {
                // console.log(1111111111111111);
                // console.log(response);

                setTimeout(() => {
                    this.setState({ isApproved: true });
                    toast.success("Click submit to join the farm");
                    this.props.updatedDataUser({
                        isLoadingPage: false
                    });
                }, TIME_OUT_CONTRACT);
            })
            .catch((error) => {
                this.props.updatedDataUser({
                    isLoadingPage: false
                });
                console.log(error);
            });
    }

    handleApproveBSC = async () => {
        const { address } = this.props.userReducer;
        const { binanceChain } = this.props.contractReducer;
        const { amount } = this.state;
        const { bscFarm, bscToken } = configs.contracts;

        this.props.updatedDataUser({
            isLoadingPage: true
        });

        const data = abi.simpleEncode(
            'approve(address,uint256):(bool)',
            bscFarm.address,
            convertNumberToWei(amount)
        );

        binanceChain
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: bscToken.address,
                        data: '0x' + Buffer.from(data).toString('hex'),
                    },
                ],
            })
            .then(async (response) => {
                // console.log(1111111111111111);
                // console.log(response);

                setTimeout(() => {
                    this.setState({ isApproved: true });
                    toast.success("Click submit to join the farm");
                    this.props.updatedDataUser({
                        isLoadingPage: false
                    });
                }, TIME_OUT_CONTRACT);
            })
            .catch((error) => {
                this.props.updatedDataUser({
                    isLoadingPage: false
                });
                console.log(error);
            });
    }

    handleSubmitUSDT = async () => {
        const { address } = this.props.userReducer;
        const { binanceChain } = this.props.contractReducer;
        const { amount } = this.state;
        const { usdtFarm } = configs.contracts;

        this.props.updatedDataUser({
            isLoadingPage: true
        });

        const data = abi.simpleEncode(
            'join(uint256):(bool)',
            convertNumberToWei(amount)
        );

        binanceChain
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: usdtFarm.address,
                        data: '0x' + Buffer.from(data).toString('hex'),
                    },
                ],
            })
            .then(async (response) => {
                // console.log(1111111111111111);
                // console.log(response);

                setTimeout(() => {
                    this.setState({ isModal: false });
                    toast.success(`Farmming ${parseFloatFixedNoRound(amount)} USDT!`);
                    this.props.updatedDataUser({
                        isLoadingPage: false
                    });
                    this.getMyStatsUSDT(binanceChain);
                }, TIME_OUT_CONTRACT);
            })
            .catch((error) => {
                this.props.updatedDataUser({
                    isLoadingPage: false
                });
                console.log(error);
            });
    }

    handleSubmitBSC = async () => {
        const { address } = this.props.userReducer;
        const { binanceChain } = this.props.contractReducer;
        const { amount } = this.state;
        const { bscFarm } = configs.contracts;

        this.props.updatedDataUser({
            isLoadingPage: true
        });

        const data = abi.simpleEncode(
            'join(uint256):(bool)',
            convertNumberToWei(amount)
        );

        binanceChain
            .request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: address,
                        to: bscFarm.address,
                        data: '0x' + Buffer.from(data).toString('hex'),
                    },
                ],
            })
            .then(async (response) => {
                // console.log(1111111111111111);
                // console.log(response);

                setTimeout(() => {
                    this.setState({ isModal: false });
                    toast.success(`Farmming ${parseFloatFixedNoRound(amount)} BSC!`);
                    this.props.updatedDataUser({
                        isLoadingPage: false
                    });
                    this.getMyStatsBSC(binanceChain);
                }, TIME_OUT_CONTRACT);
            })
            .catch((error) => {
                this.props.updatedDataUser({
                    isLoadingPage: false
                });
                console.log(error);
            });
    }

    renderContent = () => {
        const { chainId } = this.props.contractReducer;
        const { address } = this.props.userReducer;

        if (chainId !== '') {
            if (configs.chainId.includes(chainId)) {
                if (address !== null) {
                    return (
                        <>
                            <div className="slogan">
                                <img src="../../static/img/logo.png" className="image-slogan" />
                                <p className="title">Select Your Favorite Dishes</p>
                                <p className="description">Earn SUSHI tokens by staking SushiSwap V2 SLP Tokens. Note: Current APY includes 2/3rd SUSHI emission that is locked and will be retroactively disbursed at a later date.</p>
                            </div>
                            <div className="content-farm">
                                {this.renderData()}
                            </div>
                        </>
                    );
                }
            } else {
                return (
                    <a className="btn btn-web" onClick={() => this.props.updatedDataUser({ isModalConnect: true })}>🔓 Unlock Wallet</a>
                );
            }
        }

        return (
            <div className="form-lock">
                <a className="btn btn-web" onClick={() => this.props.updatedDataUser({ isModalConnect: true })}>🔓 Unlock Wallet</a>
            </div>
        );
    }

    render() {
        return (
            <Layout activeMenu={2} classes="page-farm">
                <div className="container">
                    <div className="app-content">
                        {this.renderContent()}
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer,
    contractReducer: state.contractReducer
});

const mapDispatchToProps = dispatch => ({
    updatedDataUser: (data) => dispatch(appAction.updatedDataUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Farm);