import { toast } from 'react-toastify';

export function isEmail(email) {
    var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
    return re.test(String(email).toLowerCase());
}

export function isNumber(number) {
    var re = /^[0-9]+$/;
    return re.test(number);
}

export function isAddress(address) {
    var re = /^T[a-zA-Z0-9]{33}$/;
    return re.test(address);
}

export function formatNumber(number) {
    let index = number.indexOf('.');
    if (index !== -1) {
        let result = number.slice(0, index).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        result += number.slice(index, number.length);
        return result;
    }

    let result = number.slice(index, 1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return result;
}

export function formatNumberCurrent(number) {
    let result = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return result;
}

export function toFixedCustom(num, fixed) {
    fixed = fixed || 0;
    fixed = Math.pow(10, fixed);
    return Math.floor(num * fixed) / fixed;
}

export function customNumber(number, decimal = 2) {
    if (number === 0 || number === undefined || number === '-' || number === '') {
        return 0;
    }

    let result = toFixedCustom(number, decimal).toFixed(decimal);

    if (parseFloat(result) - parseInt(result) === 0) {
        return formatNumberCurrent(parseInt(result));
    }

    result = Number(result).toString();
    return formatNumber(result);
}

export function makeMeTwoDigits(value) {
    return (value < 10 ? "0" : "") + value;
}

export const parseFloatFixedNoRound = (value, decimals = 2) => {
    if (value === 0 || value === undefined || value === '-' || value === '') {
        return 0;
    }

    const firstPart = value > 0 ? Math.floor(`${value}e${decimals}`) : Math.ceil(`${value}e${decimals}`)
    const secondPart = `e-${decimals}`;
    let result = Number(`${firstPart}${secondPart}`);
    result = result.toFixed(decimals);

    if (parseFloat(result) - parseInt(result) === 0) {
        return formatNumberCurrent(parseInt(result));
    }

    return result;
}

export function truncateAddress(str, n = 15) {
    let string = str.substring(n + 2, 42 - n);
    return str.replace(string, '...');
}

export function showToastMessage(message) {
    if (message === 'Not found') {
        return;
    }

    return toast.error(message);
}

export function truncateDecimals(number, digits = 3) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
}

export function tronAddressToEthereumAddress(tronAddress) {
    const addressInHex = tronWeb.address.toHex(tronAddress);
    return `0x${addressInHex.slice(2)}`;
}

export function convertToDecimal6(number) {
    let index = number.toString().indexOf('.');

    if (index === -1) {
        return parseFloat(number) * 1000000;
    }

    return parseFloat(parseFloatFixedNoRound(number)) * 1000000;
}