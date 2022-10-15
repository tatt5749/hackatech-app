
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

export const WALLET_OVERVIEW_URL = `fixed/overview/personal`;
export const CREATE_WALLET_URL = `fixed/setupWallet`;
export const STAKE_OVERVIEW_URL = `fixed/overview/stake`;
export const SEND_URL = `fixed/send`;
export const STAKE_URL = `fixed/stake`;
export const CLAIM_URL = `fixed/claim`;
export const UNSTAKE_URL = `fixed/unstake`;
export const STAKES_LIST_URL = `fixed/stakes`;
export const CHECK_STAKE_STATUS_URL = `fixed/transaction/status`;
export const APPROVE_STAKE_URL = `fixed/approveStake`;
export const APPROVE_CLAIM_URL = `fixed/approveClaim`;
