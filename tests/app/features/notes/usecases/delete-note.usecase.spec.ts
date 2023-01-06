import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import {DeleteNoteByUser} from '../../../../../src/app/features/notes/usecases/delete-note-user.usecase';
import { NoteRepository } from '../../../../../src/app/features/notes/repositories/note.repository';
import { NotesModel } from '../../../../../src/app/models/note.models';
import { UserModel } from '../../../../../src/app/models/user.models';

interface SutTypes {
  repository: NoteRepository;
  sut: DeleteNoteByUser;
}

const makeSut = (): SutTypes => {
  const repository = new NoteRepository();
  const sut = new DeleteNoteByUser(
    repository
  )
  return {repository, sut};
}

describe('delete a note from a user', () => {

  const user = new UserModel(
    'any_email',
    'any_pass'
  )

  const note = new NotesModel(
    'any_title',
    'any_desc',
    true,
    user
  )

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());
  afterEach(() => jest.clearAllMocks());

  test('should be able to return null if note does not exist', async () => {
    const {repository, sut} = makeSut();

    jest.spyOn(repository, 'get').mockResolvedValue(null);

    const result = sut.execute(user.id, note.idNotes);

    await expect(result).rejects.toThrow(new Error('Note not found!'));
  });

});
