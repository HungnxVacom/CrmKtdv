import axios from 'axios';
import * as CONFIGS from '../../constants/config';
import { TIME_OUT_REQUEST } from '../../helpers/utils';
import Cookies from 'js-cookie';

const getTokenFromCookie = (): string | undefined => {
    return Cookies.get('auth_token');
};