import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllProductCardComponent } from './admin-all-product-card.component';

describe('AdminAllProductCardComponent', () => {
  let component: AdminAllProductCardComponent;
  let fixture: ComponentFixture<AdminAllProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllProductCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
