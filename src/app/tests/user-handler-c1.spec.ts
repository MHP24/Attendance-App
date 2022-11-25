import { getUser, findEmail } from '../helpers/userHandler';

describe('User Handler E1', () => {
    const expectedUser = {
        mail: 'atorres@duocuc.cl', 
        password: '1234', 
        username: 'Ana Torres Leiva', 
        question: 'Nombre de tu mascota', 
        answer: 'Gato' 
    }

    it('Should return an user', () => {
        expect(getUser('atorres@duocuc.cl', '1234')).toEqual(expectedUser);
    });

    it('Should return an user searching by email', () => {
        expect(findEmail('atorres@duocuc.cl')).toEqual(expectedUser);
    });

    it("Shouldn't return an user searching by email", () => {
        expect(findEmail('armandocasas@duocuc.cl')).toEqual(undefined);
    });

    it("Shouldn't return an user searching by email", () => {
        expect(findEmail('juanitoalcachofa@duocuc.cl')).toEqual(undefined);
    });
});