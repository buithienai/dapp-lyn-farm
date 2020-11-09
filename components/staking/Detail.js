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
import Router from 'next/router'

var abi = require('ethereumjs-abi');

class Detail extends Component {
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
            },
            isLoading: true
        }
    }

    componentDidMount() {
        const { id } = this.props;

        if (!data[id]) {
            return Router.push('/');
        }

        this.setState({
            isLoading: false
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
                        <Link href="/farms/[id]" as={`/farms/${item.farm}`}>
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
        const { id } = this.props;
        const { isLoading } = this.state;

        if (isLoading) {
            return null;
        }

        return (
            <Layout activeMenu={2} classes="page-detail">
                <div className="container">
                    <div className="app-content">
                        <div className="slogan">
                            <div className="image-slogan">🍣</div>
                            <p className="title">{data[id] ? data[id].farm : ''}</p>
                            <p className="description">Deposit {data[id] ? data[id].deposit : ''} Tokens and earn {data[id] ? data[id].earn : ''}</p>
                        </div>
                        <div className="content-info">
                            <div className="content">
                                <div className="thumb">
                                    🍣
                                </div>
                                <div className="number-balance">0</div>
                                <div className="text-balance">{data[id] ? data[id].earn : ''} Earned</div>
                                <a className="btn btn-web disabled" disabled>Harvest</a>
                            </div>
                            <div className="content">
                                <div className="thumb">
                                    🍣
                                </div>
                                <div className="number-balance">0</div>
                                <div className="text-balance">{data[id] ? data[id].deposit : ''} Tokens Staked</div>
                                <a className="btn btn-web">Approve {data[id] ? data[id].deposit : ''} SLP</a>
                            </div>
                        </div>
                        <div className="text-detail">⭐️ Every time you stake and unstake LP tokens, the contract will automagically harvest {data[id] ? data[id].earn : ''} rewards for you!</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);