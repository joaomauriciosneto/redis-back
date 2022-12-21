import { v4 as idNotes } from "uuid";
import { UserModel } from "./user.models";

export class NotesModel {

    private _id: string;

    constructor(
        private _title: string,
        private _description: string,
        private _saveNote: boolean = false,
        private _user: UserModel
    ){
        this._id = idNotes();
    }

    public get saveNote() {
        return this._saveNote;
    }

    public set saveNote(saveNote: boolean) {
        this._saveNote = saveNote;
    }

    public get idNotes() {
        return this._id;
    }

    public get notes(): string[] {
        return this.notes ?? []
    }

    public get user() {
        return this._user;
    }

    // public set user(user: UserModel) {
    //   this._user = user
    // }

    public get title() {
        return this._title;
    }

    public set title(title: string) {
        this._title = title;
    }

    public get description() {
        return this._description;
    }

    public set description(description: string) {
        this._description = description;
    }

    public getNotes() {
        return {
            id: this._id,
            title: this._title,
            description: this._description,
            saveNote: this._saveNote,
            notes: this.notes,
            user: this.user
        }
    }

    public static create(
        id: string,
        title: string,
        description: string,
        saveNote: boolean,
        user: UserModel
    ) {
       const note = new NotesModel(title, description, saveNote, user);
       note._id = id;

       return note;
    }

}
