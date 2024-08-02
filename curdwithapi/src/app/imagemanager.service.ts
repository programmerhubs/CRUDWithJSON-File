import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageInfo } from './models/image-info.model';

@Injectable({
  providedIn: 'root'
})
export class ImagemanagerService {
  private apiUrl = environment.apiurl+'Image/';
  constructor(private http: HttpClient) { }
  getImages():Observable<ImageInfo[]>
  {
    return this.http.get<ImageInfo[]>(this.apiUrl+'AllImages');
  }
  PostImages(Image:ImageInfo):Observable<ImageInfo>
  {
    return this.http.post<ImageInfo>(this.apiUrl+'Add New',Image);
  }
  UpdateImage(id:number,image:ImageInfo):Observable<ImageInfo>
  {
    return this.http.put<ImageInfo>(this.apiUrl+'UpdateImage/'+id,image);
  }
  DeleteImage(id:number): Observable<void>
  {
    return this.http.delete<void>(this.apiUrl+'DeleteImage/'+id);
  }
}
