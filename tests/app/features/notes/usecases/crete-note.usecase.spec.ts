import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import {CreateNoteUseCase} from '../../../../../src/app/features/notes/usecases/create-note.usecase';
import { UserRepository } from '../../../../../src/app/features/users/repositories/user.repository';
import { NoteRepository } from '../../../../../src/app/features/notes/repositories/note.repository';
import { NotesModel } from '../../../../../src/app/models/note.models';
import { UserModel } from '../../../../../src/app/models/user.models';

describe('create a note unit test', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new CreateNoteUseCase(
      new UserRepository(),
      new NoteRepository()
    )
    return sut;
  }

  test('should be able to create a note to an user', async () => {
    const sut = makeSut();

    const user = new UserModel(
      'any_email',
      '123'
    )

    const note = new NotesModel(
      'any_title',
      'any_desc',
      false,
      user
    )

    jest.spyOn(UserRepository.prototype, 'get').mockResolvedValue(user)
    jest.spyOn(NoteRepository.prototype, 'create').mockResolvedValue(note)

    const result = await sut.execute({
      title: 'any_title',
      description: 'any_desc',
      saveNote: false,
      idUser: user.id
    })

    expect(result).toBeDefined();
    expect(result).toEqual(note.getNotes());

  });

});
