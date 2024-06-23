import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledCardsComponent } from './enrolled-cards.component';

describe('EnrolledCardsComponent', () => {
  let component: EnrolledCardsComponent;
  let fixture: ComponentFixture<EnrolledCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
