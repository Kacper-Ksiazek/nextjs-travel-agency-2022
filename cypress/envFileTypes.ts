// Generated by https://quicktype.io

export default interface CypressEnvFile {
    urls: Urls;
    data: {
        textOver255Chars: string;
        email: Field;
        password: Field;
        name: Field;
        surname: Field;
        born: Field;
    };
    credentials: {
        admin: Credentials;
        user: Credentials;
    };
}

export interface Credentials {
    email: string;
    password: string;
}
export interface Field {
    invalid: string;
    valid: string;
}

export interface Urls {
    login: string;
    register: string;
}
