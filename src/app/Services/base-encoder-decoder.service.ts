import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseEncoderDecoderService {

  constructor() { }

  base32Encode(input: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let output = '';
    let buffer = 0;
    let bitsLeft = 0;
  
    for (let i = 0; i < input.length; i++) {
      buffer = (buffer << 8) | input.charCodeAt(i);
      bitsLeft += 8;
  
      while (bitsLeft >= 5) {
        output += alphabet[(buffer >> (bitsLeft - 5)) & 31];
        bitsLeft -= 5;
      }
    }
  
    if (bitsLeft > 0) {
      output += alphabet[(buffer << (5 - bitsLeft)) & 31];
    }
  
    return output;
  }
  

  base32Decode(input: string): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    const buffer = [];
    let bitsLeft = 0;
    let bufferVal = 0;
  
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const value = alphabet.indexOf(char.toUpperCase());
  
      if (value === -1) {
        throw new Error('Invalid Base32 character');
      }
  
      bufferVal = (bufferVal << 5) | value;
      bitsLeft += 5;
  
      if (bitsLeft >= 8) {
        buffer.push((bufferVal >> (bitsLeft - 8)) & 255);
        bitsLeft -= 8;
      }
    }
  
    return String.fromCharCode(...buffer);
  }
  

  base16Encode(input: string): string {
    return input
      .split('')
      .map(c => {
        const hex = c.charCodeAt(0).toString(16);
        return hex.padStart(2, '0');
      })
      .join('');
  }

  base16Decode(input: string): string {
    const matched = input.match(/.{1,2}/g);
    if (matched) {
      return matched.map(c => String.fromCharCode(parseInt(c, 16))).join('');
    }
    return '';
  }
  
}
