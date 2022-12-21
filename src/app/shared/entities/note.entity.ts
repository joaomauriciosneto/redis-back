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

  @Column({
    name: 'id_user'
  })
  idUser: string;

  @ManyToOne(() => UserEntity, {
    eager: true
  })

  @JoinColumn({name: 'id_user'})
  user: UserEntity;

}
