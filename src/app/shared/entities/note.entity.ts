import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name: 'note'})
export class NoteEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  saveNote: boolean = false;

  //criar mais uma coluna.... verificar a api-vagas
  @ManyToOne(() => UserEntity, user => user.note)
  @JoinColumn({name: 'id_user'})
  user: UserEntity;

}