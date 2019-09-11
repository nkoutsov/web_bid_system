import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCreateComponent } from './auction-create.component';

describe('AuctionCreateComponent', () => {
  let component: AuctionCreateComponent;
  let fixture: ComponentFixture<AuctionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
