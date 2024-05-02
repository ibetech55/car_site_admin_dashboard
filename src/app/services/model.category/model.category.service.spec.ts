import { TestBed } from '@angular/core/testing';

import { ModelCategoryService } from './model.category.service';

describe('ModelCategoryService', () => {
  let service: ModelCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
