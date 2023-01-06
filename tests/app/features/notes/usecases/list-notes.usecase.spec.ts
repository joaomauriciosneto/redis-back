import { closeConnection } from "../../../../util/close-connection";
import { openConnection } from "../../../../util/open-connection";
import {ListNotesUseCase} from '../../../../../src/app/features/notes/usecases/list-note.usecase';
import { NoteRepository } from "../../../../../src/app/features/notes/repositories/note.repository";
import { CacheRepository } from "../../../../../src/app/shared/repositories/cache.repository";

describe('listing all notes', () => {

  beforeAll(async () => openConnection());
  afterAll(async () => closeConnection());

  const makeSut = () => {
    const sut = new ListNotesUseCase(
      new NoteRepository(),
      new CacheRepository()
    )
    return sut;
  }

  test('should be able to list all notes', async () => {
    const sut = makeSut();
    const result = sut.execute()

    jest.spyOn(NoteRepository.prototype, 'list').mockResolvedValue(result);

    expect(result).toBeDefined();
  });

});
