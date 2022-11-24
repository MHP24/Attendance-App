import { UserI } from "../interfaces/user.interface"
import { data } from '../files/db';

export const getUser = (_mail: string, _password: string): UserI | undefined => {
    return data.filter(({mail, password}) => {
        return _mail === mail && _password === password;
    })[0];
}

export const findEmail = (_mail: string): UserI | undefined => {
    return data.find(({mail}) => _mail === mail);
}