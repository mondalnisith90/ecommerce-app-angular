import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersCardItemComponent } from './my-orders-card-item.component';

describe('MyOrdersCardItemComponent', () => {
  let component: MyOrdersCardItemComponent;
  let fixture: ComponentFixture<MyOrdersCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOrdersCardItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
