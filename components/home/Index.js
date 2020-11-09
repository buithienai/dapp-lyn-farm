import Link from 'next/link';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../common/home/Layout';

class Home extends Component {
    render() {
        return (
            <Layout activeMenu={1} classes="page-home">
                <div className="container">
                    <div className="app-content">
                        <div className="slogan">
                            <img src="../../static/img/logo.png" className="image-slogan" />
                            <p className="title">MasterChef is Ready</p>
                            <p className="description">Stake SushiSwap LP tokens to claim your very own yummy SUSHI!</p>
                        </div>
                        <div className="wrapp-token">
                            <div className="content">
                                <div className="item">
                                    <div className="item-top">
                                        <div className="logiML">
                                            <span role="img">🍣</span>
                                            <div className="kIkmWh">
                                                <div className="text">Your SUSHI Balance</div>
                                                <div className="balance">Locked</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-bottom">
                                        Pending harvest
                                        <div className="number">0.000 SUSHI</div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="item-top">
                                        <div className="logiML">
                                            <div className="kIkmWh right">
                                                <div className="text">Total SUSHI Supply</div>
                                                <div className="balance">Locked</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item-bottom">
                                        New rewards per block
                                        <div className="number">0.000 SUSHI</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-tip">🏆<b>Pro Tip</b>: SUSHI-ETH SLP token pool yields 4.8x more token rewards per block.</h3>
                        <div className="wrapp-see-menu">
                            <Link href="/farms">
                                <a className="btn btn-web">🔪 See the Menu</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
});

export default connect(mapStateToProps)(Home);