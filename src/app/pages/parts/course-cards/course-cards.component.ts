import { Component, Input, inject } from '@angular/core';
import { EnrolledVideo, VideoInfoResponseDTO, VideoService } from '../../../services/video.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-cards.component.html',
  styleUrl: './course-cards.component.css'
})
export class CourseCardsComponent {
  videoService = inject(VideoService);
  @Input() messageToPass: string = '';

  videos: VideoInfoResponseDTO[] = [];
  enrolled: EnrolledVideo[] = [];
  
  ngOnInit(): void {
    this.videoService.getVideosInfoData().subscribe(data => {
      this.videos = data;    
    });
    this.videoService.getEnrolledVideosData().subscribe(data => {
      this.enrolled = data;    
    });   
    console.log(this.enrolled);
         
  }

  getImageSrc(thumbnailBase64: string): string {        
    return `data:image/jpeg;base64,${thumbnailBase64}`;
  }

   enroll(videoId: string): void {    
    this.videoService.enrollToVideo(videoId).subscribe();
  }

  isVideoEnrolled(videoId: string): boolean {
    return !this.enrolled.some(enrolledVideo => enrolledVideo.id === videoId);
  }
}
