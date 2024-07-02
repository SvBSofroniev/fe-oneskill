import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
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
export class CourseCardsComponent implements OnChanges {

  videoService = inject(VideoService);
  @Input() messageToPass: string = '';

  videos: VideoInfoResponseDTO[] = [];
  enrolled: EnrolledVideo[] = [];
  filteredVideos: VideoInfoResponseDTO[] = [];

  ngOnInit(): void {
    this.videoService.getVideosInfoData().subscribe(data => {
      this.videos = data;
      this.filteredVideos = this.videos;
    });
    this.videoService.getEnrolledVideosData().subscribe(data => {
      this.enrolled = data;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messageToPass'].currentValue) {
      this.filterVideos(changes['messageToPass'].currentValue);
    } else {
      this.filteredVideos = this.videos;
    }
  }

  filterVideos(value: string): void {
    if (value !== '') {
      this.filteredVideos = this.videos.filter(video =>
        video.title.toLowerCase().includes(value.toLowerCase())
      );
    }
  }

  getImageSrc(thumbnailBase64: string): string {
    return `data:image/jpeg;base64,${thumbnailBase64}`;
  }

  enroll(videoId: string): void {
    this.videoService.enrollToVideo(videoId).subscribe(data => {
    });
  }

  viewVideo(videoId: string): void{
    this.videoService.viewVideo(videoId).subscribe();
  }

  isVideoEnrolled(videoId: string): boolean {
    return !this.enrolled.some(enrolledVideo => enrolledVideo.id === videoId);
  }
}
