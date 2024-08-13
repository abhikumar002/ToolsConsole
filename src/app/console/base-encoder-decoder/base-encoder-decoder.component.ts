import { Component, OnInit } from '@angular/core';
import { BaseEncoderDecoderService } from 'src/app/Services/base-encoder-decoder.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-base-encoder-decoder',
  templateUrl: './base-encoder-decoder.component.html',
  styleUrls: ['./base-encoder-decoder.component.scss']
})
export class BaseEncoderDecoderComponent implements OnInit {

  constructor(
    private baseEncoderDecoderService: BaseEncoderDecoderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  inputText: string = '';
  outputText: string = '';
  selectedBase: string = 'base64';  // Default base

  encodeInput() {
    try {
      if (this.selectedBase === 'base64') {
        this.outputText = btoa(this.inputText);
      } else if (this.selectedBase === 'base32') {
        this.outputText = this.baseEncoderDecoderService.base32Encode(this.inputText);
      } else if (this.selectedBase === 'base16') {
        this.outputText = this.baseEncoderDecoderService.base16Encode(this.inputText);
      }

    } catch (error) {
      console.log(error);
      alert("Please Enter Valid String");
    }
  }

  decodeInput() {
    try {
      if (this.selectedBase === 'base64') {
        this.outputText = atob(this.inputText);
      } else if (this.selectedBase === 'base32') {
        this.outputText = this.baseEncoderDecoderService.base32Decode(this.inputText);
      } else if (this.selectedBase === 'base16') {
        this.outputText = this.baseEncoderDecoderService.base16Decode(this.inputText);
      }

    } catch (error) {
      console.log(error);
      alert("Please Enter Valid String");
    }
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.outputText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }

}