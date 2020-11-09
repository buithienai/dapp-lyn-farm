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