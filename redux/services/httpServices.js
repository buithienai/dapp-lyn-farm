import axios from 'axios';

const makeRequest = async (options) => {
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.reload();
        }
        throw error.response;
    }
};

export default makeRequest;