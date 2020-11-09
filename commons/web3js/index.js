import Web3 from 'web3';
import contractServices from '../../redux/services/contractServices';

const convertNumberToWei = value => {
    return Web3.utils.toWei(`${value}`)
}

const numberToGweiHex = (value) => {
    return Web3.utils.toHex(Web3.utils.toWei(`${value}`, "gwei"));
}

const fromDecimal6 = (value, fixed = 4) => {
    return Number((value / 1e6).toFixed(fixed));
}

const toDecimal6 = (value) => {
    return `${value}000000`;
}

function fromBigNumber(value) {
    const valueInHex = Web3.utils.numberToHex(value)
    return Web3.utils.hexToNumber(valueInHex)
}

const convertWeiBigNumberToNumber = (value) => {
    if (value) {
        const toWeiNumber = Web3.utils.fromWei(`${value}`);
        return parseFloat(toWeiNumber);
    }

    return null;
};

const getAccounts = async () => {
    let data = []
    if (Web3.givenProvider) {
        data = await Web3.eth.getAccounts()
    }

    return data;
};

const getCurrentAccount = async () => {
    if (Web3.givenProvider) {
        const address = Web3.givenProvider.selectedAddress;
        return address;
    }
    return null;
};

const fromCurrentAccount = async () => {
    const currentAccount = await getCurrentAccount()

    return {
        from: currentAccount.toString().toLowerCase()
    };
};

const getContractOptions = async () => {
    const gasPrice = await contractServices.fetchGasPrice()
    return Object.assign({ gasPrice }, await fromCurrentAccount())
}

const buildOptions = async () => {
    let latestBlock = await Web3.eth.getBlockNumber();

    global.latestBlock = global.latestBlock || latestBlock - 10;

    if (global.latestBlock >= latestBlock) {
        return null;
    }

    const option = {
        fromBlock: global.latestBlock + 1,
        toBlock: latestBlock
    }

    global.latestBlock = latestBlock;

    return option;
}

const timeOut = async (period = 1000) => {
    await new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, period)
    })
}

export {
    convertNumberToWei,
    numberToGweiHex,
    convertWeiBigNumberToNumber,
    getContractOptions,
    getAccounts,
    getCurrentAccount,
    fromCurrentAccount,
    buildOptions,
    timeOut,
    Web3,
    fromDecimal6,
    toDecimal6,
    fromBigNumber
}