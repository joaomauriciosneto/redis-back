import { v4 as idNotes } from "uuid";
import { UserModel } from "./user.models";

export class NotesModel {

    private _id: string;

    constructor(
        private _title: string,
        private _description: string,
        private _saveNote: boolean = false,
        private _usuario: UserModel
    ){
        this._id = idNotes();
    }

    // DÚVIDA
    public get usuario() {
      return this._usuario
    }
    // DÚVIDA
    public set usuario(usuario: UserModel) {
      this._usuario = usuario
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
            saved: this._saveNote,
            usuario: this.usuario
        }
    }

}
