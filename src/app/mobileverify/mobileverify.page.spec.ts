import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileverifyPage } from './mobileverify.page';

describe('MobileverifyPage', () => {
  let component: MobileverifyPage;
  let fixture: ComponentFixture<MobileverifyPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MobileverifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
