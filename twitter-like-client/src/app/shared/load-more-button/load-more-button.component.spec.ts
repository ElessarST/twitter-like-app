import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadMoreButtonComponent } from './load-more-button.component'
import { MatProgressSpinnerModule } from '@angular/material'

describe('LoadMoreButtonComponent', () => {
  let component: LoadMoreButtonComponent
  let fixture: ComponentFixture<LoadMoreButtonComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [LoadMoreButtonComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadMoreButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  function getSpinner() {
    return fixture.nativeElement.querySelector('mat-spinner')
  }

  function getLoadButton() {
    return fixture.nativeElement.querySelector('.load-more-button')
  }

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should show only spinner if loading', () => {
    component.isLoading = true
    fixture.detectChanges()
    expect(getSpinner()).not.toBeNull()
    expect(getLoadButton()).toBeNull()
  })

  it('should show load more button is has more', () => {
    component.isLoading = false
    component.isHasMore = true
    fixture.detectChanges()
    expect(getSpinner()).toBeNull()
    expect(getLoadButton()).not.toBeNull()
  })

  it('should hide all elements if not has more and not loading', () => {
    component.isLoading = false
    component.isHasMore = false
    fixture.detectChanges()
    expect(getSpinner()).toBeNull()
    expect(getLoadButton()).toBeNull()
  })

  it('should fire event on button click', () => {
    component.isLoading = false
    component.isHasMore = true
    fixture.detectChanges()
    component.onLoadMore.subscribe(() => expect(true).toBeTruthy());
    getLoadButton().click()
  })
})
