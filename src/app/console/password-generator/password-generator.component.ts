import { Component, AfterViewInit } from '@angular/core';
import { PasswordGeneratorService } from '../../Services/password-generator.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent implements AfterViewInit {

  passwordstring: string = '';
  passwordLength: number = 12;
  includeLowercase: boolean = false;
  includeUppercase: boolean = false;
  includeNumbers: boolean = false;
  includeSymbols: boolean = false;
  includeAmbiguous: boolean = false;

  private numbers = '0123456789';
  private symbols = '!@#$%&*?';
  private lowercase = 'abcdefghijklmnopqrstuvwxyz';
  private uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private Ambiguous = "{}[]()/'`~,;:.<>^";

  constructor(
    private passwordgeneratorService: PasswordGeneratorService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.passwordstring = null;
  }

  generatePassword() {
    this.passwordstring = null;
    let validChars = '';

    if (this.includeLowercase) {
      validChars += this.lowercase;
    }

    if (this.includeNumbers) {
      validChars += this.numbers;
    }

    if (this.includeSymbols) {
      validChars += this.symbols;
    }

    if (this.includeUppercase) {
      validChars += this.uppercase;
    }

    if (this.includeAmbiguous) {
      validChars += this.Ambiguous;
    }

    if (validChars.length === 0) {
      this.passwordstring = 'Please select at least one character type!';
    }
    else{
      this.passwordstring = this.passwordgeneratorService.generatePassword(validChars, this.passwordLength);
    }
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.passwordstring;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }

}
