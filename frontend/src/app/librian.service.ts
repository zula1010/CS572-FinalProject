import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { LibrianApi } from './librian/librian.component';

@Injectable({
  providedIn: 'root'
})
export class LibrianService {

  constructor(private http: HttpClient) { }

    /**
   * 
   * @param payload 
   */
  public list(page: number):Observable<LibrianApi> {
    const sub = this.http
      .get<LibrianApi>(`${environment.apiEndpoint}/api/admin/librian?page=${page}`);
    return sub;
  }
}
