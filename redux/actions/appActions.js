import { CREATE_CONTRACT, CREATE_CONTRACT_SUCCESS, UPDATED_DATA_USER, UPDATE_DATE_CONTRACT } from '../constants/appConstants';

export function createContract() {
    return {
        type: CREATE_CONTRACT
    }
}

export function listContract(data) {
    return {
        type: CREATE_CONTRACT_SUCCESS,
        data: data
    }
}

export function updateDataContract(data) {
    return {
        type: UPDATE_DATE_CONTRACT,
        data: data
    }
}

export function updatedDataUser(data) {
    return {
        type: UPDATED_DATA_USER,
        data: data
    }
}