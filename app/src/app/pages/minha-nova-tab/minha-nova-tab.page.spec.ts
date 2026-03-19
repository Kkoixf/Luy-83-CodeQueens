import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhaNovaTabPage } from './minha-nova-tab.page';

describe('MinhaNovaTabPage', () => {
  let component: MinhaNovaTabPage;
  let fixture: ComponentFixture<MinhaNovaTabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhaNovaTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
