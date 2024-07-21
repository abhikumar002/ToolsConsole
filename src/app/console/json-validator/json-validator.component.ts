import { Component, OnInit } from '@angular/core';
import { JsonValidationService } from '../../Services/json-validation.service';

@Component({
  selector: 'app-json-validator',
  templateUrl: './json-validator.component.html',
  styleUrls: ['./json-validator.component.scss']
})


export class JsonValidatorComponent {
  jsonString: string = '';
  beautifiedJson: string = '';
  successMessage: string = '';
  validationResult: { valid: boolean, errors?: any } | null = null;
  lineNumbers: number[] = [];
  showLineNumbers: boolean = true;

  constructor(private jsonValidationService: JsonValidationService) {}

  // ngOnInit() {
  //   this.updateLineNumbers();
  // }

  // updateLineNumbers() {
  //   const lines = this.jsonString.split('\n').length;
  //   this.lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);
  // }

  validateJson() {
    this.validationResult = this.jsonValidationService.validateJson(this.jsonString);
  }

  beautifyJson() {
    try {
      // Parse and format JSON
      this.validateJson();
      const parsedJson = JSON.parse(this.jsonString);
      this.beautifiedJson = JSON.stringify(parsedJson, null, 2); // 2 spaces for indentation
      this.successMessage = 'JSON has been beautified.';
      this.validationResult.errors = '';
    } catch (e) {
      this.validationResult.errors = 'Invalid JSON format.';
      this.beautifiedJson = '';
      this.successMessage = '';
    }
  }

  clearTextBox() {
    this.jsonString = '';
    this.beautifiedJson = '';
    this.successMessage = '';
    this.validationResult = null;
  }
}
