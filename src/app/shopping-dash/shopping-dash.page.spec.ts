import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingDashPage } from './shopping-dash.page';

describe('ShoppingDashPage', () => {
  let component: ShoppingDashPage;
  let fixture: ComponentFixture<ShoppingDashPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShoppingDashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
