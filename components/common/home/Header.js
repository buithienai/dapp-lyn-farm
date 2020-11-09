import Link from 'next/link';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import configs from '../../../configs';
import * as appAction from '../../../redux/actions/appActions';
import ModalConnect from './ModalConnect';
import ModalMyWallet from './ModalMyWallet';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalDetect: false
        }
    }

    handleChange = (data) => {
        this.setState({
            ...data
        });
    }

    renderButtonConnect = () => {
        const { chainId } = this.props.contractReducer;
        const { address } = this.props.userReducer;

        if (chainId !== '') {
            if (configs.chainId.includes(chainId)) {
                if (address !== null) {
                    return (
                        <a className="btn btn-web" onClick={() => this.props.updatedDataUser({ isModalMyWallet: true })}>My wallet</a>
                    );
                }
            } else {
                return (
                    <a className="btn btn-web" onClick={() => this.props.updatedDataUser({ isModalConnect: true })}>Unlock Wallet</a>
                );
            }
        }

        return (
            <a className="btn btn-web" onClick={() => this.props.updatedDataUser({ isModalConnect: true })}>Unlock Wallet</a>
        );
    }

    render() {
        const { activeMenu } = this.props;

        return (
            <>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <Link href="/">
                            <a className="navbar-brand">
                                <img src="../../../static/img/logo.png" />
                                <span>
                                    SushiSwap
                                    <span className="font">MasterChef</span>
                                </span>
                            </a>
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav">
                                <Link href="/">
                                    <a className={"nav-link " + (activeMenu === 1 ? 'active' : '')}>
                                        Home
                                    </a>
                                </Link>
                                <Link href="/farms">
                                    <a className={"nav-link " + (activeMenu === 2 ? 'active' : '')}>
                                        Farms
                                    </a>
                                </Link>
                                <Link href="/staking">
                                    <a className={"nav-link " + (activeMenu === 3 ? 'active' : '')}>
                                        Staking
                                    </a>
                                </Link>
                                <a className="nav-link" href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x17bc015607fdf93e7c949e9ca22f96907cfbef88" target="_blank">
                                    Swap
                                </a>
                                <Link href="/faq">
                                    <a className={"nav-link " + (activeMenu === 2 ? 'active' : '')}>
                                        FAQ
                                    </a>
                                </Link>
                            </ul>
                            <div className="form-lang">
                                {this.renderButtonConnect()}
                            </div>
                        </div>
                        <div className="form-lang mobile">
                            {this.renderButtonConnect()}
                        </div>
                    </nav>
                </div>
                <ModalConnect />
                <ModalMyWallet />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);