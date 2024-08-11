import { Injectable } from '@angular/core';
import * as jsonlint from 'jsonlint-mod'; // Use jsonlint-mod for browser compatibility
import * as ace from 'ace-builds';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class XmlValidatorService {
  private aceEditor: ace.Ace.Editor | undefined;
  private errorMarkerId: number | null = null; 
  hasError: boolean = false;
  authToken:string;
  http: any;
  Jsonstring : string;
  keyCount?: number;
  correctedJson: any;

  constructor() {}

  setEditorInstance(editor: ace.Ace.Editor) {
    this.aceEditor = editor;
  }
  

  validateXml(jsonString: string): { valid: boolean, errors?: string } {
    try {
      this.clearErrorMarkers();
      let parsedJson;
      try {
        parsedJson = JSON.parse(jsonString);
      } catch (e) {
        // If JSON parsing fails, try XML parsing
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(jsonString, 'application/xml');
    
        const parseError = xmlDoc.getElementsByTagName('parsererror');
        if (parseError.length > 0) {
          throw new Error(parseError[0].textContent || 'Error parsing XML');
        }
    
        let keyCount = 0;
        if (xmlDoc.documentElement && xmlDoc.documentElement.nodeName !== 'parsererror') {
          keyCount = xmlDoc.documentElement.childNodes.length;
        }
    
        return { valid: true, keyCount: keyCount } as any;
      }
    
      if (typeof parsedJson === 'object' && parsedJson !== null) {
        const keyCount = Object.keys(parsedJson).length;
        return { valid: true, keyCount: keyCount } as any;
      } else {
        throw new Error('Invalid JSON');
      }
    } catch (e) {
      this.highlightError(e.message);
      const errorDetails = this.extractErrorDetails(e.message, jsonString);
      this.hasError = true;
      this.Jsonstring = jsonString;
      return { valid: false, errors: errorDetails };
    }
  }

  private extractErrorDetails(errorMessage: string, jsonString: string): string {
    if (!errorMessage) {
      return 'An unknown error occurred.';
    }
    const lines = jsonString.split('\n');
    let lineNum = 0;
    let columnNum = 0;

    const lineMatch = errorMessage.match(/line (\d+)/);
    const columnMatch = errorMessage.match(/column (\d+)/);
    
    if (lineMatch) {
      lineNum = parseInt(lineMatch[1], 10);
    }
    if (columnMatch) {
      columnNum = parseInt(columnMatch[1], 10);
    }
  
    const lineContent = lines[lineNum - 1] || '';
    return `Error: ${errorMessage}\nLine: ${lineNum}\nColumn: ${columnNum}\n${lineContent}`;
  }

  private highlightError(errorMessage: string): void {
    if (!this.aceEditor) {
      console.error('Ace Editor instance is not set.');
      return;
    }

    let lineNum = 0;
    let columnNum = 0;
    const lineMatch = errorMessage.match(/line (\d+)/);
    const columnMatch = errorMessage.match(/column (\d+)/);
    
    if (lineMatch) {
      lineNum = parseInt(lineMatch[1], 10) - 1;
    }
    if (columnMatch) {
      columnNum = parseInt(columnMatch[1], 10) - 1;
    }
    if (lineMatch || columnMatch) {
      const Range = ace.require('ace/range').Range;
      const session = this.aceEditor.getSession();
      this.errorMarkerId = session.addMarker(
        new Range(lineNum, 0, lineNum, Infinity),
        'ace_error-marker',
        'fullLine' 
      );

      this.aceEditor.getSession().setAnnotations([{
        row: lineNum,
        column: columnNum,
        text: errorMessage,
        type: 'error'
      }]);
    }
  }

  removemarker(){
    if (this.aceEditor) {
      const session = this.aceEditor.getSession();
      // Clear all markers
      const markers = session.getMarkers(true);
      for (let markerId in markers) {
        if (markers.hasOwnProperty(markerId)) {
          session.removeMarker(Number(markerId));
        }
      }
      session.clearAnnotations();
      this.clearErrorMarkers();
    }
  }

  public clearErrorMarkers() {
    if (this.errorMarkerId !== null) {
      this.aceEditor.getSession().removeMarker(this.errorMarkerId);
      this.errorMarkerId = null; // Reset the marker ID
    }
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

  generateWithAI() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    this.http.post('/api/json/generate-with-ai', { jsonString: this.Jsonstring }, { headers })
      .subscribe((response: any) => {
        this.correctedJson = response.correctedJson;
      }, (error) => {
        console.error('Error generating JSON with AI:', error);
      });
  }

  formatXml(xml: string): string {
    const PADDING = '  '; // Define your preferred indentation
    const reg = /(>)(<)(\/*)/g;
    let formatted = '';
    let pad = 0;
  
    xml = xml.replace(reg, '$1\r\n$2$3');
    xml.split('\r\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }
  
      formatted += PADDING.repeat(pad) + node + '\r\n';
      pad += indent;
    });
  
    return formatted.trim();
  }
  
}
