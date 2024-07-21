import { Injectable } from '@angular/core';
import * as jsonlint from 'jsonlint-mod'; // Use jsonlint-mod for browser compatibility
import JSON5 from 'json5';

@Injectable({
  providedIn: 'root'
})
export class JsonValidationService {

  validateJson(jsonString: string): { valid: boolean, errors?: string } {
    try {
      // Try parsing the JSON string
      jsonlint.parse(jsonString);
      return { valid: true };
    } catch (e) {
      // Return error details with message
      return { valid: false, errors: e.message };
    }
  }

  private extractErrorDetails(errorMessage: string, jsonString: string): string {
    const lines = jsonString.split('\n');
    let lineNum = 0;
    let columnNum = 0;
    
    const lineColumnMatch = errorMessage.match(/line (\d+), column (\d+)/);
    if (lineColumnMatch) {
      lineNum = parseInt(lineColumnMatch[1], 10);
      columnNum = parseInt(lineColumnMatch[2], 10);
    }

    return `Error: ${errorMessage}\nLine: ${lineNum}\nColumn: ${columnNum}\n${lines[lineNum - 1]}`;
  }
}
