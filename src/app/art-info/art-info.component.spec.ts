import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtInfoComponent } from './art-info.component';

describe('ArtInfoComponent', () => {
  let component: ArtInfoComponent;
  let fixture: ComponentFixture<ArtInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
