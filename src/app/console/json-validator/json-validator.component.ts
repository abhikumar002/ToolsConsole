import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { JsonValidationService } from '../../Services/json-validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
//import * as ace from 'ace-builds';
//declare const ace: any; 
//import 'ace-builds/src-noconflict/mode-json_custom'; 

@Component({
  selector: 'app-json-validator',
  templateUrl: './json-validator.component.html',
  styleUrls: ['./json-validator.component.scss']
})


export class JsonValidatorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) private editor: ElementRef<HTMLElement>;
  jsonString: string = '';
  beautifiedJson: string = '';
  private aceEditor: any;
  beautifiedJsonHtml: string = '';
  successMessage: string = '';
  validationResult: { valid: boolean, errors?: any } | null = null;
  lineNumbers: number[] = [];
  showLineNumbers: boolean = true;

  constructor(
    private jsonValidationService: JsonValidationService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    // Load Ace Editor dynamically
    import('ace-builds/src-noconflict/ace').then(aceModule => {
      // Load the custom mode script dynamically
      import('src/assets/ace/json-custom-mode').then(() => {
        this.aceEditor = aceModule.default.edit(this.editor.nativeElement);
        this.aceEditor.setTheme('ace/theme/Venom'); // Use a dark theme
        this.aceEditor.session.setMode('ace/mode/json_custom'); // Set the custom mode
        this.aceEditor.session.setValue(this.jsonString);

        this.aceEditor.setOptions({
          fontSize: '14px',
          lineHeight: 1.2,
        });

        this.aceEditor.session.setUseWrapMode(true);

        this.aceEditor.session.on('change', () => {
          this.jsonString =this.aceEditor.getValue();
        });
      });
    });
  }

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
      this.beautifiedJsonHtml = this.syntaxHighlight(this.beautifiedJson);
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
    if (this.aceEditor) {
      this.aceEditor.setValue(''); // Clear the editor content
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

  syntaxHighlight(json: string): string {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|(\b(true|false|null)\b)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}
