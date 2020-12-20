export default {
    Auth: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        LOGIN_GOOGLE: '/auth/login-google'
    },
    Account: {
        CHANGE_PASSWORD: '/account/change-password',
        CONFIRM_EMAIL: '/account/confirm-email',
        RESET_PASSWORD: '/account/reset-password',
        SEND_CONFIRMATION_MAIL: '/account/send-confirmation-mail'
    }
} as const;