import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { DictionaryService } from './dictionary.service';
import { SettingsService } from './settings.service';
import { TranslateService } from './translate.service';

const wordsSeparator = ' ';

@Injectable({
  providedIn: 'root',
})
export class AddToDictionaryService {
  constructor(
    private translateService: TranslateService,
    private settingsService: SettingsService,
    private dictionaryService: DictionaryService
  ) {}

  addToDictionary(text: string) {
    from(text.split(wordsSeparator)).subscribe((word) => {
      const wordToTranslate = word.toLowerCase();
      this.translateService
        .translate(wordToTranslate)
        .subscribe((translate) => {
          this.dictionaryService.addTranslate(
            wordToTranslate,
            this.settingsService.fromLang,
            translate,
            this.settingsService.toLang
          );
        });
    });
  }
}
