import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { MatIconModule } from '@angular/material'
import { Location } from '@angular/common'

import { PageTitleComponent } from './page-title.component'

describe('PageTitleComponent', () => {
  let component: PageTitleComponent
  let fixture: ComponentFixture<PageTitleComponent>
  let location: jasmine.SpyObj<Location>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [PageTitleComponent],
      providers: [
        {
          provide: Location,
          useValue: {
            back: jasmine.createSpy()
          }
        }
      ]
    }).compileComponents()
    location =  TestBed.get(Location)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should display correct title', () => {
    component.title = 'New Title'
    fixture.detectChanges();
    const titleElement = fixture.nativeElement
    expect(titleElement.querySelector('.mat-title').textContent).toBe('New Title')
  })

  describe('canGoBack input', () => {
    function getGoBack() {
      const titleElement = fixture.nativeElement
      return titleElement.querySelector('.back-button')
    }

    it('should not display canGoBack by default', () => {
      expect(getGoBack()).toBeNull()
    })

    it('should not display canGoBack by default', () => {
      component.canGoBack = true
      fixture.detectChanges();
      expect(getGoBack()).not.toBeNull()
    })

    it('should call location back on call', () => {
      component.canGoBack = true
      fixture.detectChanges();
      getGoBack().click()
      expect(location.back).toHaveBeenCalled()
    })
  })
})
