import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-text-minifier',
  templateUrl: './text-minifier.component.html',
  styleUrls: ['./text-minifier.component.scss']
})
export class TextMinifierComponent implements OnInit {

  inputText: string = '';
  minifiedText: string = '';
  removeSpaces: boolean = false;
  removeTabs: boolean = false;
  removeLines: boolean = false;

  constructor(
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  minifyText(): void {
    let result = this.inputText;

    if (this.removeSpaces) {
      result = result.replace(/\s+/g, '');
    }
    if (this.removeTabs) {
      result = result.replace(/\t+/g, '');
    }
    if (this.removeLines) {
      result = result.replace(/(\r\n|\n|\r)/gm, '');
    }

    this.minifiedText = result;
  }

  copyToClipboard() {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = this.minifiedText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    this.snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }

}
