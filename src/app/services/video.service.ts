import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface VideoInfoResponseDTO {
  title: string;
  description: string;
  status: string;
  uploadDate: string;
  thumbnailBase64: any;
  likes: number;
  dislikes: number;
  views: number;
}


@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private http = inject(HttpClient);
  public data: any;

  constructor() { }

  getVideosInfoData():Observable<any>{
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    return this.http.get('http://localhost:8082/oneskill/videos',{
       headers:{
        'Authorization': `Bearer ${jwtToken}`,        
        'Access-Control-Allow-Origin':"*"
     }});
   }
}
