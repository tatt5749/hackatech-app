
import {API_KEY,API_URL,ENCRYPT_KEY,MEDIA_URL,APP_NAME,CURRENCY_CODE,COUNT_CHECK,CHECK_DURATION_SECOND} from '@env';



//Api Config
export const apiKey =API_KEY;
export const apiUrl = API_URL
export const appName = APP_NAME
export const currencyCode = CURRENCY_CODE
export const countCheck = COUNT_CHECK
export const waitingSecond = CHECK_DURATION_SECOND
export const encryptKEY = ENCRYPT_KEY;
export const mediaURL=MEDIA_URL;

//API End Points
export const LOGIN_URL = `auth/login`;
export const LOGIN_EMAIL_URL = `auth/login/email`;
export const LOGIN_PHONE_URL = `auth/login/phone`;

export const HOME_OVERVIEW_URL = `fixed/overview`;