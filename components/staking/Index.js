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

    handleChange = (data) => {
        this.setState({
            ...data
        })
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
                                <p className="title">Irasshaimase!</p>
                                <p className="description">Welcome to the Sushi Bar, stake Sushi to earn Sushi.</p>
                            </div>
                            <div className="content-farm staking">
                                <div className="item">
                                    <div className="content">
                                        <div className="thumb">🍣</div>
                                        <h3 className="number">0.000</h3>
                                        <div className="description">xSUSHI (SushiBar) Available</div>
                                        <a className="btn btn-web">Convert to SUSHI</a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="content">
                                        <div className="thumb">🍣</div>
                                        <h3 className="number">0.000</h3>
                                        <div className="description">xSUSHI (SushiBar) Available</div>
                                        <a className="btn btn-web">Approve SUSHI</a>
                                    </div>
                                </div>
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
            <Layout activeMenu={3} classes="page-farm">
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