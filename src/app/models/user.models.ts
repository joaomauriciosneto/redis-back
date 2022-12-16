import { v4 as idUser } from "uuid";

export class UserModel {
    private _id: string;

    constructor(
        private _email: string,
        private _password: string
    ){
        this._id = idUser();
    }

    public get id() {
        return this._id;
    }

    public get email() {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get password() {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }

    public toJson() {
        return {
            id: this._id,
            email: this._email,
            password: this._password
        }
    }

    public static create(id: string, email: string, password: string) {
        const user = new UserModel(email, password)
        user._id = id

        return user;
    }
}
