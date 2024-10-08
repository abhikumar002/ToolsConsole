import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PasswordGeneratorService {

  generatedPassword: string | null = null;

  constructor() { }

  public generatePassword(validChars: string, passwordLength: number): string{

    this.generatedPassword = '';
    if(passwordLength > 3000)
    {
      //this.generatedPassword = "Password length is too long.";
      alert("Password length is too long.");
      return this.generatedPassword;
    }
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      this.generatedPassword += validChars[index];
    }

    if(this.generatedPassword.length < passwordLength )
    {
      this.generatePassword(validChars,passwordLength);
    }

    return this.generatedPassword;
  }
}
