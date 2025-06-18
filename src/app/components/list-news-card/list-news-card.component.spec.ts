import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNewsCardComponent } from './list-news-card.component';

describe('ListNewsComponent', () => {
  let component: ListNewsCardComponent;
  let fixture: ComponentFixture<ListNewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListNewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
