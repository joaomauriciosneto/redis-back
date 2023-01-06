import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import {ListNoteUserUseCase} from "../../../../../src/app/features/notes/usecases/list-note-user.usecase";
import { UserRepository } from "../../../../../src/app/features/users/repositories/user.repository";
import { NotesModel } from "../../../../../src/app/models/note.models";
import { UserModel } from "../../../../../src/app/models/user.models";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";
import { SharedUserRepository } from "../../../../../src/app/shared/repositories/SharedUserRepository";
import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";

interface SutTypes {
  repository: NoteRepository;
  userRepository: UserRepository;
  sharedRepository: SharedUserRepository;
  sut: ListNoteUserUseCase;
}

const makeSut = (): SutTypes => {
  const repository = new NoteRepository();
  const userRepository = new UserRepository();
  const sharedRepository = new SharedUserRepository();
  const sut = new ListNoteUserUseCase(
    userRepository, repository, sharedRepository
  )

  return {repository, userRepository, sharedRepository, sut}
}

describe('list the note of a user', () => {

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

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());
  afterEach(() => jest.clearAllMocks());

  test('should be able to return a note from a user', async () => {
    const {repository, sut, sharedRepository } = makeSut();

    jest.spyOn(repository, 'listNotesById').mockResolvedValue([note]);
    jest.spyOn(sharedRepository, 'getUserById').mockResolvedValue(user);

    const result = await sut.execute(user.id);

    expect(result).not.toBeNull();
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  test('should be able return null when user does not exist', async () => {
    const {sut, sharedRepository} = makeSut();

    jest.spyOn(sharedRepository, 'getUserById').mockResolvedValue(null);

    const result = await sut.execute('any_id');

    expect(result).toBeNull();

  });

  test('should be able return null when note does not exist', async () => {
    const {sut, repository} = makeSut();

    jest.spyOn(repository, 'listNotesById').mockResolvedValue([note]);

    const result = await sut.execute('any_id');

    expect(result).toBeNull();

  });

  test('should be able to compare note and user id', async () => {
    const {repository, sharedRepository, sut} = makeSut();

    jest.spyOn(sharedRepository, 'getUserById').mockResolvedValue(user);
    jest.spyOn(repository, 'listNotesById').mockResolvedValue([note]);

    const result = await sut.execute(user.id)

    const idUser = result?.[0].user.id

    expect(idUser).toBe(note.user.id);
    expect(result).not.toBeNull();
    expect(result).toBeDefined();
    expect(sharedRepository.getUserById).toHaveBeenCalledTimes(1);
  });
});
