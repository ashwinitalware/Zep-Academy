import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtocartPage } from './addtocart.page';

describe('AddtocartPage', () => {
  let component: AddtocartPage;
  let fixture: ComponentFixture<AddtocartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddtocartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
