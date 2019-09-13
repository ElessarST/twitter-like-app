import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { RetweetModalComponent } from './retweet-modal.component'

describe('RetweetModalComponent', () => {
  let component: RetweetModalComponent
  let fixture: ComponentFixture<RetweetModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetweetModalComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(RetweetModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
