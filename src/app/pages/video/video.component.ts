import { Component, ElementRef, OnInit, inject, NgZone, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  VideoService } from '../../services/video.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import env from '../../../env-constants'

type Comment = {
  content: "",
  username: "",
  timestamp: ""
}

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit, AfterViewInit, OnChanges  {
  @ViewChild('videoPlayer')
  videoPlayer!: ElementRef<HTMLVideoElement>;
  videoService = inject(VideoService);
  sanitizer  = inject(DomSanitizer)
  videoUrl: SafeUrl | undefined;
  videoId! : string  | null;

  router = inject(Router);
  video = {
    username: '',
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

  likes = 0;
  dislikes = 0;
  dislikesTouched = false;
  likesTouched = false;

  comments: Comment[] = [];



  constructor(private ngZone: NgZone, private route: ActivatedRoute) {}
  
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.paramMap.subscribe((params) => {
      this.videoId = params.get('id');
    });
    this.videoService.getVideoStream(this.videoId).subscribe(blob => {
      this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    });
    this.videoService.getVideoInfoData(this.videoId).subscribe({
      next: res => {
        this.video = res
        this.likes = this.video.likes;
        this.dislikes = this.video.dislikes;
      }
    })
    this.videoService.getComments(this.videoId).subscribe({
      next: res =>{
        this.comments = res;
      }
    });
  }

  reloadVideoInfoData(){
    this.videoService.getVideoInfoData(this.videoId).subscribe({
      next: res => {
        this.video = res
        this.likes = this.video.likes;
        this.dislikes = this.video.dislikes;
      }
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

  reloadComments() {
    this.videoService.getComments(this.videoId).subscribe({
      next: res => {
        this.comments = res;
      }
    });
  }

  interact(id: string, action: string): void {
    if (action === 'like') {
      this.likes++;
      this.likesTouched = true;
      console.log(1);
      
      if (this.dislikesTouched) {
        console.log(2);

        this.dislikes--;
        this.dislikesTouched = false;
      }
    } else if (action === 'dislike') {
      console.log(3);

      this.dislikes++;
      this.dislikesTouched = true;
      if (this.likesTouched) {
        console.log(4);

        this.likes--;
        this.likesTouched = false;
      }
    }

    this.videoService.interact(id, action).subscribe({
      next: () => {
        console.log(5);

        this.reloadVideoInfoData();
      },
      error: () => {        
        console.log(6);
        
        if (action === 'like') {
          this.likes--;
          this.likesTouched = false;
        } else if (action === 'dislike') {
          this.dislikes--;
          this.dislikesTouched = false;
        }
      }
    });
  }

  commentContent: string = '';

  comment(content: string) {
    this.videoService.comment(this.videoId, content).subscribe({
      next: () => {
        this.reloadComments();
      }
    });
  }

  onSubmitComment(event: Event, videoId: string) {
    event.preventDefault();
    if (this.commentContent.trim()) {
      this.comment(this.commentContent);
      this.commentContent = ''; 
    } else {
      console.log('Comment content is empty.');
    }
  }
}


