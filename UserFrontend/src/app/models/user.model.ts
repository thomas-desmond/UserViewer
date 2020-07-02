export class User {

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    id: number;
    firstName: string;
    lastName: string;
    address: string;
    age: number;
    interests: string;
    picture: string;
}
