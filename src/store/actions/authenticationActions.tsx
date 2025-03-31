import axios from 'axios';
import * as CONFIGS from '../../constants/config';
import { TIME_OUT_REQUEST } from '../../helpers/utils';
import Cookies from 'js-cookie';

const getTokenFromCookie = (): string | undefined => {
    return Cookies.get('auth_token');
};

export const getPageCustomerGroup = async (
    page: number,
    limit: number,
    search: string

) => {
    try {
        let url = CONFIGS.CUSTOMER_GROUP_GET_END_POINT.concat(`?Page=${page}&Limit=${limit}`);
        let token = getTokenFromCookie();
        const response = await axios.get(url, {
            headers: {
                'Authorization': "Bearer " + token
            },
            timeout: TIME_OUT_REQUEST,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}