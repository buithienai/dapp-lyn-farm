import React, { Component } from "react";
import FarmComponent from "../../components/farm/Index";

class Farms extends Component {
    static getInitialProps() {
        return {
            namespacesRequired: ['common']
        }
    }

    render() {
        return (
            <FarmComponent />
        );
    }
}

export default Farms;