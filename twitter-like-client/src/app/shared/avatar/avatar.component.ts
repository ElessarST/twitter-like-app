import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FileUploader } from 'ng2-file-upload'

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() url?: string
  @Input() large?: boolean = false
  @Input() changeable?: boolean = false
  @Output() onChange: EventEmitter<string> = new EventEmitter()

  constructor() {}

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
    this.fileUploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      form.append('upload_preset', 'dtihy6pt')
      form.append('folder', 'home')
      form.append('file', fileItem)
      fileItem.withCredentials = false
      return { fileItem, form }
    }
    this.fileUploader.onCompleteItem = (item: any, response: string) =>
      this.onChange.emit(JSON.parse(response).url)
  }

  get avatarUrl() {
    return this.url || 'https://pngimage.net/wp-content/uploads/2018/06/no-profile-image-png-6.png'
  }
}
