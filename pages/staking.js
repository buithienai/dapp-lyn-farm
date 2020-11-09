import React, { Component } from "react";
import StakingComponent from "../components/staking/Index";

class Staking extends Component {
    static getInitialProps() {
        return {
            namespacesRequired: ['common']
        }
    }

    render() {
        return (
            <StakingComponent />
        );
    }
}

export default Staking;