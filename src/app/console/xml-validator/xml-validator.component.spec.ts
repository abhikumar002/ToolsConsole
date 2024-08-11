import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlValidatorComponent } from './xml-validator.component';

describe('XmlValidatorComponent', () => {
  let component: XmlValidatorComponent;
  let fixture: ComponentFixture<XmlValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmlValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
