import {openConnection} from '../../../../util/open-connection';
import {closeConnection} from '../../../../util/close-connection';
import {NoteRepository} from '../../../../../src/app/features/notes/repositories/note.repository';
import {SharedUserRepository} from '../../../../../src/app/shared/repositories/SharedUserRepository';
import {CacheRepository} from '../../../../../src/app/shared/repositories/cache.repository';
import {UpdateNoteUsecase} from '../../../../../src/app/features/notes/usecases/update-note.usecase';

interface SutTypes {
  repository: NoteRepository;
  userRepository: SharedUserRepository;
  cacheRepository: CacheRepository;
  sut: UpdateNoteUsecase;
}

const makeSut = (): SutTypes => {
  const repository = new NoteRepository();
  const userRepository = new SharedUserRepository();
  const cacheRepository = new CacheRepository();
  const sut = new UpdateNoteUsecase(
    repository, cacheRepository, userRepository
  )
  return {repository, userRepository, cacheRepository, sut}
}

describe('update a note', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());
  afterEach(() => jest.clearAllMocks());

  test('should be able to return null if note does not exist', async () => {
    const {repository, sut, cacheRepository} = makeSut();

    jest.spyOn(repository, 'get').mockResolvedValue(null);

    const result = await sut.execute({
      title: 'any_title',
      description: 'any_desc',
      saveNote: true,
      idUser: '123abc',
      idNotes: '222abc'
    })

    expect(result).toBeNull();

  });

  test('should be able to return error if user id differs from user note id', async () => {
    const {repository, sut} = makeSut();
    const error = new Error('Only the owner of the message can change!');

    jest.spyOn(repository, 'get').mockRejectedValue(error);

    const result = sut.execute({
      title: 'any_title',
      description: 'any_desc',
      saveNote: true,
      idUser: '123abc',
      idNotes: '222abc'
    });

    await expect(result).rejects.toThrow(error);

  });

});
