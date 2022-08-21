import { UserI } from "../interfaces/user.interface"
import { data } from '../files/db';

export const getUser = (_email: string, _password: string): UserI | undefined => {
    return data.filter(({email, password}) => {
        return _email === email && _password === password;
    })[0];
}

export const findEmail = (_email: string): UserI | undefined => {
    return data.find(({email}) => _email === email);
}