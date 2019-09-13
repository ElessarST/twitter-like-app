import { TestBed } from '@angular/core/testing'

import { AuthService } from './auth.service'
import { UserService } from '../core/user.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { of } from 'rxjs'
import { testUser } from '../mocks'

describe('AuthService', () => {
  let authService: AuthService
  let userService: jasmine.SpyObj<UserService>
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getCurrentUser: jasmine.createSpy(),
          },
        },
      ],
    })
    authService = TestBed.get(AuthService)
    userService = TestBed.get(UserService)
  })

  it('should be created', () => {
    expect(authService).toBeTruthy()
  })

  describe('fetchCurrentUser', () => {
    it('should throw error if no token', done => {
      localStorage.removeItem('token')
      authService.fetchCurrentUser().subscribe(
        () => {
          throw Error('should not reach')
        },
        error => {
          expect(error).toBe('No token')
          done()
        }
      )
    })

    it('should call user service to get user', done => {
      localStorage.setItem('token', 'token')
      userService.getCurrentUser.and.returnValue(of(testUser))
      authService.fetchCurrentUser().subscribe(
        () => {
          expect(userService.getCurrentUser).toHaveBeenCalled()
          done()
        },
        () => {
          throw Error('should not reach')
        }
      )
    })
  })
})
