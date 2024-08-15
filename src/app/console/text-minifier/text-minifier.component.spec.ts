import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMinifierComponent } from './text-minifier.component';

describe('TextMinifierComponent', () => {
  let component: TextMinifierComponent;
  let fixture: ComponentFixture<TextMinifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextMinifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMinifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
