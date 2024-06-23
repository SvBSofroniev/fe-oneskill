import { Component, Input, inject } from '@angular/core';
import { VideoService, VideoInfoResponseDTO, EnrolledVideo } from '../../../services/video.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-enrolled-cards',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './enrolled-cards.component.html',
  styleUrl: './enrolled-cards.component.css'
})
export class EnrolledCardsComponent {
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
         
  }

  getImageSrc(thumbnailBase64: string): string {        
    return `data:image/jpeg;base64,${thumbnailBase64}`;
  }

   enroll(videoId: string): void {    
    this.videoService.enrollToVideo(videoId).subscribe();
  }

  isVideoEnrolled(videoId: string): boolean {
    return this.enrolled.some(enrolledVideo => enrolledVideo.id === videoId);
  }
}
