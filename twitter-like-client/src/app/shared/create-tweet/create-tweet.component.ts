import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FileUploader } from 'ng2-file-upload'
import { AuthService } from '../../auth/auth.service'
import { User } from '../../models/User'

@Component({
  selector: 'app-create-tweet',
  templateUrl: './create-tweet.component.html',
  styleUrls: ['./create-tweet.component.scss'],
})
export class CreateTweetComponent implements OnInit {
  public createTweetForm: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.createTweetForm = formBuilder.group({
      text: ['', Validators.required],
      photos: formBuilder.array([]),
    })
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
    this.fileUploader.onBuildItemForm = (
      fileItem: any,
      form: FormData,
    ): any => {
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

  get currentUser(): User {
    return this.authService.currentUserValue
  }
}
