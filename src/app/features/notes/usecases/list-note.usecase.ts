import { CacheRepository } from "../../../shared/repositories/cache.repository";
import { NoteRepository } from "../repositories/note.repository";

export class ListNotesUseCase {
  constructor(
    private repository: NoteRepository,
    private cacheRepository: CacheRepository
  ) {}

  public async execute() {
    const chachedList = this.cacheRepository.get('notes');

    if(chachedList) {
      return chachedList;
    }

    const result = await this.repository.list();
    const resultJson = result.map(item => item.getNotes());

    await this.cacheRepository.set('notes', resultJson);

    return resultJson;

  }
}
