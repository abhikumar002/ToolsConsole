import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonDataService } from './Services/json-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'ToolsConsole';
  data: any;
  dataList: any[];
  postResponse: any;

  constructor(
    private jsonDataService: JsonDataService,
    private router: Router
  ) {}

  navigateToJsonValidator() {
    this.router.navigate(['/json-validator']);
  }

  navigateToXmlValidator() {
    this.router.navigate(['/xml-validator']);
  }

  navigateToPasswordGenerator() {
    this.router.navigate(['/password-generator']);
  }

  navigateTobaseEncoderDecoder() {
    this.router.navigate(['/base-encoder-decoder']);
  }

  navigateToQRGenerator() {
    this.router.navigate(['/qr-generator']);
  }

  navigateTobarcodeGenerator() {
    this.router.navigate(['/barcode-generator']);
  }

  navigateTotextminifier() {
    this.router.navigate(['/text-minifier']);
  }

  ngOnInit() {
    this.jsonDataService.getData().subscribe(response => {
      this.data = response;
    });

    this.jsonDataService.getDataList().subscribe(response => {
      this.dataList = response;
    });

    const postData = { key1: 'value1', key2: 'value2' };
    this.jsonDataService.postData(postData).subscribe(response => {
      this.postResponse = response;
    });
  }
}
