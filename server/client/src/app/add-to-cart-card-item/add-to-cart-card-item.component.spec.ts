import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartCardItemComponent } from './add-to-cart-card-item.component';

describe('AddToCartCardItemComponent', () => {
  let component: AddToCartCardItemComponent;
  let fixture: ComponentFixture<AddToCartCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCartCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToCartCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
