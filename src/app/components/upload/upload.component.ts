import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from '../../services/upload.service';
import { DragdropService } from "../../services/drag-drop.service";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  //uploadedFiles: FileList = new FileList;
  fileArr : File[] = [];
  imgArr = [];
  fileObj = [];
  msg: string = '';
  progress: number = 0;

  constructor(private uploadService: UploadService, public dragdropService: DragdropService) {}

  ngOnInit() {}

  onDropFile(event: FileList) {
    console.log('event:', event)
    const fileListAsArray = Array.from(event);
    this.fileArr  = this.fileArr.concat(fileListAsArray)
  }

  onFileBrowse(event: Event) {
    const target = event.target as HTMLInputElement
    //if(target.files) this.processFiles(target.files)
    if(target.files) this.fileArr = Array.from(target.files)
    console.log('this.fileArr:', this.fileArr)
  }

  processFiles() {
    if(this.fileArr.length) {
      const formData: any = new FormData();
      this.fileArr.forEach( file => {
        console.log('file:', file)
        // called once readAsDataURL is completed
        formData.append("files", file, file['name']);
      })
      this.uploadService.uploadFiles(formData).subscribe((res:any) => {
        if( res.status===200 ){
          this.msg=res.body.msg
        }
      })
    }
    
  }

  reload() {
    window.location.reload()
  }
}