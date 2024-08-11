import { Component,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { XmlValidatorService } from '../../Services/xml-validator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as ace from 'ace-builds';


@Component({
  selector: 'app-xml-validator',
  templateUrl: './xml-validator.component.html',
  styleUrls: ['./xml-validator.component.scss']
})
export class XmlValidatorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) private editor: ElementRef<HTMLElement>;
  xmlString: string = '';
  beautifiedXml: string = '';
  private aceEditor: ace.Ace.Editor | undefined;
  beautifiedXmlHtml: string = '';
  successMessage: string = '';
  validationResult: { valid: boolean, errors?: any } | null = null;

  constructor(
    private XmlValidationService: XmlValidatorService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    import('ace-builds/src-noconflict/ace').then(aceModule => {
      import('src/assets/ace/json-custom-mode').then(() => {
        this.aceEditor = aceModule.default.edit(this.editor.nativeElement);
        this.aceEditor.setTheme('ace/theme/Venom'); // Use a dark theme
        this.aceEditor.session.setMode('ace/mode/json_custom'); // Set the custom mode
        this.aceEditor.session.setValue(this.xmlString);
        this.XmlValidationService.setEditorInstance(this.aceEditor);
        this.aceEditor.getSession().on('change', () => {
          this.onChange();
        });

        this.aceEditor.setOptions({
          fontSize: '14px',
          lineHeight: 1.2,
        });

        this.aceEditor.session.setUseWrapMode(true);

        this.aceEditor.session.on('change', () => {
          this.xmlString = this.aceEditor.getValue();
        });
      });
    });
  }

  onChange() {
    const content = this.aceEditor.getValue();
    try {
      this.beautifiedXmlHtml = this.styleJson(content);
    } catch (error) {
      this.validationResult = { valid: false, errors: [error.message] };
      this.beautifiedXmlHtml = '';
    }
  }

  styleJson(json: string): string {
    return json
      .replace(/"[^"]*"/g, match => `<span class="json-key">${match}</span>`)
      .replace(/: "([^"]*)"/g, ': <span class="json-value">$1</span>')
      .replace(/\bnull\b/g, '<span class="json-null">null</span>');
  }


  validateXml() {
    this.XmlValidationService.removemarker()
    this.validationResult = this.XmlValidationService.validateXml(this.xmlString);
  }

  beautifyXml() {
    try {
      // Validate the XML first
      this.validateXml();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(this.xmlString, 'application/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.getElementsByTagName('parsererror');
      if (parseError.length > 0) {
        throw new Error(parseError[0].textContent || 'Invalid XML format.');
      }
      
      // Convert the XML document back to a string with formatting
      const serializer = new XMLSerializer();
      const beautifiedXml = this.XmlValidationService.formatXml(serializer.serializeToString(xmlDoc));
      
      // Optionally, you can highlight the beautified XML in HTML
      this.beautifiedXml = beautifiedXml;
      this.beautifiedXmlHtml = this.XmlValidationService.syntaxHighlight(beautifiedXml);
  
      this.successMessage = 'XML has been beautified.';
      this.validationResult.errors = '';
    } catch (e) {
      this.validationResult.errors = 'Invalid XML format.';
      this.beautifiedXml = '';
      this.beautifiedXmlHtml = '';
      this.successMessage = '';
    }
  }
  

  clearTextBox() {
    this.XmlValidationService.removemarker()
    if (this.aceEditor) {
      this.aceEditor.setValue('');
    }
    this.xmlString = '';
    this.beautifiedXml = '';
    this.successMessage = '';
    this.beautifiedXmlHtml = '';
    this.validationResult = null;
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.beautifiedXml;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }
}

