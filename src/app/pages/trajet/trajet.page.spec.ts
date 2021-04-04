import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { TrajetPage } from "./trajet.page";

describe("TrajetPage", () => {
  let component: TrajetPage;
  let fixture: ComponentFixture<TrajetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrajetPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
