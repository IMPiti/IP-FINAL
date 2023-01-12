/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetaylarComponent } from './detaylar.component';

describe('DetaylarComponent', () => {
  let component: DetaylarComponent;
  let fixture: ComponentFixture<DetaylarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaylarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaylarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
