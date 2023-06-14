import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IGoWord } from '../../models/goWord';
import { DictionaryService } from '../../services/dictionary.service';
import { goValidator } from './go.validator';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.css'],
})
export class GoComponent implements OnInit {
  goForm!: FormGroup;
  goWords!: Array<IGoWord>;

  constructor(
    private fb: FormBuilder,
    private dictionaryService: DictionaryService
  ) {
    this.goWords = this.dictionaryService.getGoWords();
    this.goForm = this.fb.group(
      {
        testResult: this.fb.control(false),
      },
      {
        validators: [goValidator(this.goWords)],
      }
    );
    for (const goWord of this.goWords) {
      this.goForm.addControl(goWord.word1, this.fb.control(''));
    }
  }

  ngOnInit(): void {}
}
