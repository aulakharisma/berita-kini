import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsHeadlineComponent } from './news-headline.component';

describe('NewsHeadlineComponent', () => {
  let component: NewsHeadlineComponent;
  let fixture: ComponentFixture<NewsHeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsHeadlineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
