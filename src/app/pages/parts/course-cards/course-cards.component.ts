import { Component, Input, inject } from '@angular/core';
import { VideoInfoResponseDTO, VideoService } from '../../../services/video.service';
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
  
  ngOnInit(): void {
    console.log(this.messageToPass);
    this.videoService.getVideosInfoData().subscribe(data => {
      this.videos = data;    
    });
  }

  getImageSrc(thumbnailBase64: string): string {        
    return `data:image/jpeg;base64,${thumbnailBase64}`;
  }
}
