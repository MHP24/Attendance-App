import { getUser, findEmail } from '../helpers/userHandler';

describe('User Handler E1', () => {
    const expectedUser = {
        mail: 'atorres@mail.com', 
        password: '1234', 
        username: 'Ana Torres Leiva', 
        question: 'Nombre de tu mascota', 
        answer: 'Gato' 
    }

    it('Should return an user', () => {
        expect(getUser('atorres@mail.com', '1234')).toEqual(expectedUser);
    });

    it('Should return an user searching by email', () => {
        expect(findEmail('atorres@mail.com')).toEqual(expectedUser);
    });

    it("Shouldn't return an user searching by email", () => {
        expect(findEmail('armandocasas@mail.com')).toEqual(undefined);
    });

    it("Shouldn't return an user searching by email", () => {
        expect(findEmail('juanitoalcachofa@mail.com')).toEqual(undefined);
    });
});