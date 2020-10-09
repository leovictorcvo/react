import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

@EntityRepository(Category)
class CategoriesRepository extends Repository<Category> {
  public async findByTitle(title: string): Promise<Category | null> {
    const record = await this.findOne({
      where: { title },
    });

    return record || null;
  }
}

export default CategoriesRepository;
