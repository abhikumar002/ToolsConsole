import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { JsonValidationService } from '../../Services/json-validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ace from 'ace-builds';

@Component({
  selector: 'app-json-validator',
  templateUrl: './json-validator.component.html',
  styleUrls: ['./json-validator.component.scss']
})
export class JsonValidatorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) private editor: ElementRef<HTMLElement>;
  jsonString: string = '';
  beautifiedJson: string = '';
  private aceEditor: ace.Ace.Editor | undefined;
  beautifiedJsonHtml: string = '';
  successMessage: string = '';
  validationResult: { valid: boolean, errors?: any } | null = null;

  constructor(
    private jsonValidationService: JsonValidationService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    import('ace-builds/src-noconflict/ace').then(aceModule => {
      import('src/assets/ace/json-custom-mode').then(() => {
        this.aceEditor = aceModule.default.edit(this.editor.nativeElement);
        this.aceEditor.setTheme('ace/theme/Venom'); // Use a dark theme
        this.aceEditor.session.setMode('ace/mode/json_custom'); // Set the custom mode
        this.aceEditor.session.setValue(this.jsonString);
        this.jsonValidationService.setEditorInstance(this.aceEditor);

        this.aceEditor.setOptions({
          fontSize: '14px',
          lineHeight: 1.2,
        });

        this.aceEditor.session.setUseWrapMode(true);

        this.aceEditor.session.on('change', () => {
          this.jsonString = this.aceEditor.getValue();
        });
      });
    });
  }

  validateJson() {
    this.jsonValidationService.removemarker()
    this.validationResult = this.jsonValidationService.validateJson(this.jsonString);
  }

  beautifyJson() {
    try {
      this.validateJson();
      const parsedJson = JSON.parse(this.jsonString);
      this.beautifiedJson = JSON.stringify(parsedJson, null, 2);
      this.beautifiedJsonHtml = this.jsonValidationService.syntaxHighlight(this.beautifiedJson);
      this.successMessage = 'JSON has been beautified.';
      this.validationResult.errors = '';
    } catch (e) {
      this.validationResult.errors = 'Invalid JSON format.';
      this.beautifiedJson = '';
      this.beautifiedJsonHtml = '';
      this.successMessage = '';
    }
  }

  clearTextBox() {
    this.jsonValidationService.removemarker()
    if (this.aceEditor) {
      this.aceEditor.setValue('');
    }
    this.jsonString = '';
    this.beautifiedJson = '';
    this.successMessage = '';
    this.beautifiedJsonHtml = '';
    this.validationResult = null;
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.beautifiedJson;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }
}
