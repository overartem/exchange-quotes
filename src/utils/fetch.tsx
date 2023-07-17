import axios from 'axios';

import { GET_FETCH_URL, POST_FETCH_URL } from '../constants/settings';
import { WebSocketMessageData } from '../types/data';

export function sendData(calculations: WebSocketMessageData[], batchsize: number) {
    axios
        .post(POST_FETCH_URL, { calculations, batchsize })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

export function getStatistics(page: number) {
    return axios
        .get(GET_FETCH_URL, {
            params: {
                page: page,
            },
        })
        .then((res) => {
            const { quotations, totalPages } = res.data;
            return { quotations, totalPages };
        });
}
