import fs from 'fs';
import path from 'path';
import csv from 'neat-csv';
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import uploadConfig from '../config/upload';

import Category from '../models/Category';

interface TransactionDto {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  private async readTransactionsFromCsv(
    filename: string,
  ): Promise<TransactionDto[]> {
    const filePath = path.join(uploadConfig.directory, filename);
    const fileExists = await fs.promises.stat(filePath);
    if (!fileExists) {
      throw new AppError('File not found', 404);
    }

    const content = await fs.promises.readFile(filePath, 'utf8');
    const data = (
      await csv(content, {
        mapHeaders: ({ header }) => header.trim(),
        mapValues: ({ value }) => value.trim(),
      })
    ).map(row => {
      return {
        title: row.title,
        type: row.type,
        value: parseInt(row.value, 10),
        category: row.category,
      } as TransactionDto;
    });
    await fs.promises.unlink(filePath);

    return data;
  }

  private async saveCategories(categories: string[]): Promise<Category[]> {
    const repository = getRepository(Category);

    const categoriesInDb = await repository.find();
    const savedCategoriesTitles = categoriesInDb.map(
      category => category.title,
    );

    const categoriesToSave = categories
      .filter(category => savedCategoriesTitles.indexOf(category) === -1)
      .filter((value, index, self) => self.indexOf(value) === index);

    const categoriesCreated = repository.create(
      categoriesToSave.map(title => ({ title })),
    );

    const categoriesSaved = await repository.save(categoriesCreated);

    return [...categoriesInDb, ...categoriesSaved];
  }

  private async saveTransactions(
    transactionsDto: TransactionDto[],
    categories: Category[],
  ): Promise<Transaction[]> {
    const repository = getRepository(Transaction);

    const transactionsCreated = repository.create(
      transactionsDto.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: categories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    const transactions = await repository.save(transactionsCreated);

    return transactions;
  }

  async execute(filename: string): Promise<Transaction[]> {
    const transactionsDto = await this.readTransactionsFromCsv(filename);
    const categories = await this.saveCategories(
      transactionsDto.map(transaction => transaction.category),
    );
    const transactions = await this.saveTransactions(
      transactionsDto,
      categories,
    );
    return transactions;
  }
}

export default ImportTransactionsService;
