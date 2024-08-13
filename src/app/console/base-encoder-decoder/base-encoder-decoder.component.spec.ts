import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEncoderDecoderComponent } from './base-encoder-decoder.component';

describe('BaseEncoderDecoderComponent', () => {
  let component: BaseEncoderDecoderComponent;
  let fixture: ComponentFixture<BaseEncoderDecoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseEncoderDecoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseEncoderDecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
