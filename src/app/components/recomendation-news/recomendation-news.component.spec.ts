import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomendationNewsComponent } from './recomendation-news.component';

describe('RecomendationNewsComponent', () => {
  let component: RecomendationNewsComponent;
  let fixture: ComponentFixture<RecomendationNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecomendationNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendationNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
