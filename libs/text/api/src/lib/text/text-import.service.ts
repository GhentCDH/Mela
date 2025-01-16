import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WorkSheet, read } from 'xlsx';

import { Logger } from '@ghentcdh/tools/logging/api';

import { parsePhrases } from './import/sheet1';
import { TextRepositoryService } from './text-repository.service';
import { PhraseRepository } from '../phrase/phrase.repository';

const context = 'TextImportService';

@Injectable()
export class TextImportService {
  constructor(
    private readonly textRepositoryService: TextRepositoryService,
    private readonly phraseRepository: PhraseRepository,
  ) {}

  async parse(id: string, file: any) {
    const text = await this.textRepositoryService.findOne(id);

    if (!text)
      throw new HttpException('Entity not found', HttpStatus.NOT_FOUND);
    // parse the file and update the text
    const workBook = read(file.buffer);
    
    const sheet1 = workBook.Sheets[workBook.SheetNames[0]];

    const created = await Promise.all([this.parsePhrases(id, sheet1)]);

    // TODO what if partial fail
    // TODO parse other fields in the sheet
  }

  private async parsePhrases(textId: string, sheet: WorkSheet) {
    Logger.log(context, 'Parsing phrases...');
    const phrases = parsePhrases(textId, sheet);

    Logger.log(context, `parsed success phrases: ${phrases.length}`);

    return this.phraseRepository.createPhrases(phrases);
  }
}
