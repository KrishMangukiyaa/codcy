import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBlogsComponent } from './category-blogs.component';

describe('CategoryBlogsComponent', () => {
  let component: CategoryBlogsComponent;
  let fixture: ComponentFixture<CategoryBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
