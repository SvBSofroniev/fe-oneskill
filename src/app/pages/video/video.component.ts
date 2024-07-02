import { Component, ElementRef, OnInit, inject, NgZone, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoInfoResponseDTO, VideoService } from '../../services/video.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit, AfterViewInit {
  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef<HTMLVideoElement>;
  videoService = inject(VideoService);
  sanitizer  = inject(DomSanitizer)
  videoUrl: SafeUrl | undefined;
  videoId! : string  | null;

  router = inject(Router);
  video = {
    videoId: '',
    title: '',
    description: '',
    status: '',
    uploadDate: '',
    thumbnailBase64: null,
    likes: 0,
    dislikes: 0,
    views: 0

  };


  constructor(private ngZone: NgZone, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.videoId = params.get('id');
    });
    this.videoService.getVideoStream(this.videoId).subscribe(blob => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    });
    this.videoService.getVideoInfoData(this.videoId).subscribe({
      next: res => {
        this.video = res}
    })    
  }
  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement;

    video.onenterpictureinpicture = () => {
      this.ngZone.run(() => {

      });
    };

    video.onleavepictureinpicture = () => {
      this.ngZone.run(() => {
        this.router.navigate([`/videos/${this.videoId}`]); 
      });
    };
  }

  like(id: string){
    this.interact(id, 'like');
  }

  dislike(id: string){
    this.interact(id, 'dislike');
  }

  interact(id: string, action:string){
    this.videoService.interact(id, action).subscribe();
  }
}


