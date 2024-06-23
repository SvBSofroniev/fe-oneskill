import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  router = inject(Router);
videoService = inject(VideoService);
  formData: any = {
    title: '',
    description: ''
  };
  videoFile: File | null = null;
  thumbnailFile: File | null = null;
  videoFileError: string | null = null;
  thumbnailFileError: string | null = null;

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    if (fileType === 'videoFile') {
      if (file && file.type !== 'video/mp4') {
        this.videoFileError = 'Only MP4 videos are allowed.';
        this.videoFile = null;
        event.target.value = ''; // Reset the input field
      } else {
        this.videoFileError = null;
        this.videoFile = file;
      }
    } else if (fileType === 'thumbnailFile') {
      if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
        this.thumbnailFileError = 'Only JPEG and PNG images are allowed.';
        this.thumbnailFile = null;
        event.target.value = ''; // Reset the input field
      } else {
        this.thumbnailFileError = null;
        this.thumbnailFile = file;
      }
    }
  }

  onSubmit() {
    if (this.videoFile && this.thumbnailFile) {
      const formData = new FormData();
      formData.append('username', this.formData.username);
      formData.append('title', this.formData.title);
      formData.append('description', this.formData.description);
      formData.append('videoFile', this.videoFile);
      formData.append('thumbnailFile', this.thumbnailFile);
      
      
      this.videoService.uploadVideo(formData).subscribe({
        next: res=>{
          console.log('Video uploaded', res);
          alert('Video uploaded');
          this.router.navigateByUrl('/courses')
        },
        error: ()=> alert('Video was not uploaded')
      });

      // .subscribe(
      //   {
      //     next:res=>{
      //       if(res.token && res.username){
      //         this.router.navigateByUrl('/');
      //       }
      //     },
      //     error: ()=> alert('Wrong credentials.')
      //   }
      // );
    }
  }
}


