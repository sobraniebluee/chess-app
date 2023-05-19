export const AVAILABLE_LANGUAGES = {
    en: "en",
    ru: "ru"
}
export const ERROR_MESSAGES = {
    [AVAILABLE_LANGUAGES.en]: {
        USERNAME_ALREADY_USED: "This username already used!",
        EMAIL_ALREADY_USED: "This email already used!",
        EMPTY_EMAIL: "Please enter email!",
        USERNAME_NOT_FOUND: "Sorry, but we haven't user with that username!",
        EMAIL_NOT_FOUND: "Sorry, but we haven't user with that email!",
        PASSWORD_NOT_MATCH: "Sorry, but password not match!",
        LOGOUT: "Error logout!",
        TOKEN_NOT_VALID: "Authenticate token is not valid!Try login again!",
        TOKEN_EMPTY: "Authenticate token must be provided!"
    },
    [AVAILABLE_LANGUAGES.ru]: {
        USERNAME_ALREADY_USED: "Этот никнейм уже используется!",
        EMAIL_ALREADY_USED: "Этот е-маил уже используется!",
        EMPTY_EMAIL: "ru ru ru!",
        USERNAME_NOT_FOUND: "Sorry, but we haven't user with that username!",
        EMAIL_NOT_FOUND: "Sorry, but we haven't user with that email!",
        PASSWORD_NOT_MATCH: "Sorry, but password not match!",
        LOGOUT: "Error logout![ru]",
        TOKEN_NOT_VALID: "Authenticate token is not valid![ru]",
        TOKEN_EMPTY: "Authenticate token must be provided![ru]"
    }
}

export type LangErrorMessages = keyof typeof ERROR_MESSAGES;
export type FieldErrorMessages = keyof typeof ERROR_MESSAGES[LangErrorMessages];

export const errorMessagesLocales = (field: string, lang: string = "en") => {
    if (lang in ERROR_MESSAGES) {
        if (field in ERROR_MESSAGES[lang as LangErrorMessages]) {
            return ERROR_MESSAGES[lang as LangErrorMessages][field as FieldErrorMessages];
        }
    }
    return ERROR_MESSAGES["en"][field as FieldErrorMessages]
}

