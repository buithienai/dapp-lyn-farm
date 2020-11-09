import { CREATE_CONTRACT_SUCCESS, UPDATE_DATE_CONTRACT } from '../constants/appConstants';
const initialState = {
    listContract: {},
    chainId: '',
    binanceChain: null
};

export default function contractReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_CONTRACT_SUCCESS:
            return {
                ...state,
                listContract: action.data
            };
        case UPDATE_DATE_CONTRACT:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}