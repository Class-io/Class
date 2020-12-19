export default {
    Auth: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register'
    },
    Account: {
        CHANGE_PASSWORD: '/account/change-password',
        CONFIRM_EMAIL: '/account/confirm-email',
        RESET_PASSWORD: '/account/reset-password',
        SEND_CONFIRMATION_MAIL: '/account/send-confirmation-mail'
    }
} as const;