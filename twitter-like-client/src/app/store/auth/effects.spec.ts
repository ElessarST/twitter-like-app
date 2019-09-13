import { cold, hot } from 'jasmine-marbles'
import * as AuthActions from './actions'
import { AuthEffects } from './effects'
import { Observable } from 'rxjs'
import { TestBed } from '@angular/core/testing'
import { provideMockActions } from '@ngrx/effects/testing'
import { AuthService } from '../../auth/auth.service'
import { RouterTestingModule } from '@angular/router/testing'
import { testUser } from '../../mocks'

describe('Auth Effects', () => {
  let actions: Observable<any>

  let effects: AuthEffects
  let authService: jasmine.SpyObj<AuthService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        {
          provide: AuthService,
          useValue: {
            fetchCurrentUser: jasmine.createSpy(),
          },
        },
      ],
    })

    effects = TestBed.get(AuthEffects)
    authService = TestBed.get(AuthService)
  })

  describe('getCurrentUser$', () => {
    it('should return a stream with current user loaded action', () => {
      const currentUser = testUser
      const action = AuthActions.getCurrentUser()
      const outcome = AuthActions.getCurrentUserSuccess({ user: currentUser })

      actions = hot('-a', { a: action })
      const response = cold('-a|', { a: currentUser })
      authService.fetchCurrentUser.and.returnValue(response)

      const expected = cold('--b', { b: outcome })
      expect(effects.getCurrentUser$).toBeObservable(expected)
    })

    it('should return error if failed to load user', () => {
      const error = new Error('some error') as any
      const action = AuthActions.getCurrentUser()
      const outcome = AuthActions.getCurrentUserError()

      actions = hot('-a', { a: action })
      const response = cold('-#|', {}, error)
      authService.fetchCurrentUser.and.returnValue(response)

      const expected = cold('--(b|)', { b: outcome })
      expect(effects.getCurrentUser$).toBeObservable(expected)
    })
  })
})
