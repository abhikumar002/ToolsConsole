import { Injectable } from '@angular/core';
import * as jsonlint from 'jsonlint-mod'; // Use jsonlint-mod for browser compatibility
import * as ace from 'ace-builds';

@Injectable({
  providedIn: 'root'
})

export class JsonValidationService {
  private aceEditor: ace.Ace.Editor | undefined;
  private errorMarkerId: number | null = null; 

  constructor() {}

  setEditorInstance(editor: ace.Ace.Editor) {
    this.aceEditor = editor;
  }

  validateJson(jsonString: string): { valid: boolean, errors?: string } {
    try {
      const parsedJson = jsonlint.parse(jsonString);
      this.clearErrorMarkers();
      let keyCount = 0;
      if (typeof parsedJson === 'object' && parsedJson !== null) {
        keyCount = Object.keys(parsedJson).length;
      }
      return { valid: true };
    } catch (e) {
      this.highlightError(e.message);
      const errorDetails = this.extractErrorDetails(e.message, jsonString);
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
}
