import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrdersCardItemComponent } from './customer-orders-card-item.component';

describe('CustomerOrdersCardItemComponent', () => {
  let component: CustomerOrdersCardItemComponent;
  let fixture: ComponentFixture<CustomerOrdersCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOrdersCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrdersCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
