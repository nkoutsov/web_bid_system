import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionEditDeleteComponent } from './auction-edit-delete.component';

describe('AuctionEditDeleteComponent', () => {
  let component: AuctionEditDeleteComponent;
  let fixture: ComponentFixture<AuctionEditDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionEditDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
