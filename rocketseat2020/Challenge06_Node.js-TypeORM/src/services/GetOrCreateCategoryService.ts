import { getCustomRepository } from 'typeorm';

import Category from '../models/Category';
import CategoriesRepository from '../repositories/CategoriesRepository';

class GetOrCreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const repository = getCustomRepository(CategoriesRepository);
    const categoryInDb = await repository.findByTitle(title);

    if (categoryInDb) {
      return categoryInDb;
    }

    const category = repository.create({ title });
    await repository.save(category);
    return category;
  }
}

export default GetOrCreateCategoryService;
