import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import env from '../../env-constants'

export interface VideoInfoResponseDTO {
  videoId: string;
  title: string;
  description: string;
  status: string;
  uploadDate: string;
  thumbnailBase64: any;
  likes: number;
  dislikes: number;
  views: number;
}

export interface EnrolledVideo{
  id: string;
}


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  getEnrolledVideosData():Observable<any> {
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    return this.http.get('http://localhost:8082/oneskill/videos/enrolled',{
       headers:{
        'Authorization': `Bearer ${jwtToken}`,        
        'Access-Control-Allow-Origin':"*"
     }});
  }
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

   getVideoInfoData(id: string | null):Observable<any>{
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    return this.http.get(`http://localhost:8082/oneskill/videos/${id}`,{
       headers:{
        'Authorization': `Bearer ${jwtToken}`,        
        'Access-Control-Allow-Origin':"*"
     }});
   }

   getVideoStream(id: any): Observable<Blob> {
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    
    return this.http.get(`http://localhost:8082/oneskill/videos/stream/${id}`, { 
      headers: headers,
      responseType: 'blob'
    });
  }

  uploadVideo(formData: FormData): Observable<boolean> {
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.post<boolean>('http://localhost:8082/oneskill/videos/upload', formData, {
      headers: headers
    });
  }

  enrollToVideo(id: string) : Observable<any>{
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
    return this.http.post('http://localhost:8082/oneskill/videos/enroll', id, {
      headers: headers
    });
  }

  viewVideo(id: string) :Observable<any>{
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    return this.http.patch(`http://localhost:8082/oneskill/videos/${id}/view`,{}, {
      headers:{'Authorization': `Bearer ${jwtToken}`,        
      'Access-Control-Allow-Origin':"*"
    }});
  }

  interact(id: string, action: string): Observable<any>{
    const jwtToken = sessionStorage.getItem('JWT_TOKEN');
    return this.http.patch(`http://localhost:8082/oneskill/videos/${id}/interact`,
      {
        "username" : sessionStorage.getItem(env.USER),
        "action": action
      },
      {
        headers:{'Authorization': `Bearer ${jwtToken}`,        
        'Access-Control-Allow-Origin':"*"
      }}
    )

  }
}
