import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingpolicyPage } from './shippingpolicy.page';

describe('ShippingpolicyPage', () => {
  let component: ShippingpolicyPage;
  let fixture: ComponentFixture<ShippingpolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShippingpolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
