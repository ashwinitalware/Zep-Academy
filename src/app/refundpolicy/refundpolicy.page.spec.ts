import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RefundpolicyPage } from './refundpolicy.page';

describe('RefundpolicyPage', () => {
  let component: RefundpolicyPage;
  let fixture: ComponentFixture<RefundpolicyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RefundpolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
