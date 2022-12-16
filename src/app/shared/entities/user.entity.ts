import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity({name: 'users'})
export class UserEntity {

  @PrimaryColumn()
  idUser: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => NoteEntity, note => note.user)
  note: NoteEntity[];

}