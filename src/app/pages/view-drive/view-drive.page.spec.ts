import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrivePage } from './view-drive.page';

describe('ViewDrivePage', () => {
  let component: ViewDrivePage;
  let fixture: ComponentFixture<ViewDrivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
