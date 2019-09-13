import { get } from 'lodash'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FileUploader } from 'ng2-file-upload'
import { TweetsService } from '../../core/tweets.service'
import { IAppState } from '../../store/app/state'
import { Store } from '@ngrx/store'
import { Response, Tweet, User } from '../../models'
import { selectCurrentUser } from '../../store/auth/selectors'
import { Observable } from 'rxjs'
import { setServerErrors } from '../../utils/response'

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  public createTweetForm: FormGroup
  public currentUser$: Observable<User>
  public isCreating: boolean = false
  @Input() public placeholder?: string = "What's happening?"
  @Input() public retweetFrom?: string
  @Input() public replyTo?: string
  @Output() onCreate: EventEmitter<Tweet> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder,
    private tweetsService: TweetsService,
    private store: Store<IAppState>
  ) {
    this.setFormInitialState()
  }

  public fileUploader: FileUploader = new FileUploader({
    url: 'https://api.cloudinary.com/v1_1/drqvrxltc/image/upload',
    autoUpload: true,
    isHTML5: true,
    removeAfterUpload: true,
    headers: [
      {
        name: 'X-Requested-With',
        value: 'XMLHttpRequest',
      },
    ],
  })

  ngOnInit() {
    this.currentUser$ = this.store.select(selectCurrentUser).pipe()
    this.fileUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'dtihy6pt')
      form.append('folder', 'home')
      form.append('file', fileItem)
      fileItem.withCredentials = false
      return { fileItem, form }
    }
    this.fileUploader.onCompleteItem = (item: any, response: string) =>
      this.filesForm.push(this.formBuilder.control(JSON.parse(response).url))
  }

  get filesForm(): FormArray {
    return this.createTweetForm.get('photos') as FormArray
  }

  removePhoto(index) {
    this.filesForm.removeAt(index)
  }

  get isUploading(): boolean {
    return this.fileUploader.isUploading
  }

  get textLength(): number {
    return get(this.createTweetForm.value, 'text.length', 0)
  }

  setFormInitialState() {
    this.createTweetForm = this.formBuilder.group({
      text: ['', Validators.required],
      photos: this.formBuilder.array([]),
    })
  }

  submit() {
    this.isCreating = true
    const { text, photos } = this.createTweetForm.value
    this.tweetsService
      .createTweet(text, photos, get(this.retweetFrom, '_id'), get(this.replyTo, '_id'))
      .subscribe(
        ({ data: tweet }) => {
          this.setFormInitialState()
          this.onCreate.emit(tweet)
        },
        (error: Response<Tweet>) => {
          setServerErrors(this.createTweetForm, error.fieldErrors)
          this.isCreating = false
        },
        () => (this.isCreating = false)
      )
  }
}
