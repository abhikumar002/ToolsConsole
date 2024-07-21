import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonBeautifierComponent } from './json-beautifier.component';

describe('JsonBeautifierComponent', () => {
  let component: JsonBeautifierComponent;
  let fixture: ComponentFixture<JsonBeautifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonBeautifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonBeautifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
