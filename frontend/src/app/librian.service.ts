import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { LibrianApi, LibrianElement, LibrianIdApi } from './librian/librian.component';

@Injectable({
  providedIn: 'root'
})
export class LibrianService {

  constructor(private http: HttpClient) { }

  /**
 * 
 * @param payload 
 */
  public list(page: number): Observable<LibrianApi> {
    const sub = this.http
      .get<LibrianApi>(`${environment.apiEndpoint}/api/admin/librian?page=${page}`);
    return sub;
  }

  public insertLibrian(data){
    return this.http.post(`${environment.apiEndpoint}/api/admin/librian`, data);
  }
  
  public updateLibrian(id, data){
    return this.http.put(`${environment.apiEndpoint}/api/admin/librian/${id}`, data);
  }

  public updateLibrianPassword(id, password){
    return this.http.put(`${environment.apiEndpoint}/api/admin/librian/${id}/password`, {password:password});
  }


  public get(id: string): Observable<LibrianIdApi> {
    const sub = this.http
      .get<LibrianIdApi>(`${environment.apiEndpoint}/api/admin/librian/${id}`);
    return sub;
  }

  public deleteLibrian(id){
    return this.http.delete(`${environment.apiEndpoint}/api/admin/librian/${id}`);
  }
   
  // References https://arjunphp.com/angular-2-async-validator-usernameemail-availability-check/
  // https://stackoverflow.com/questions/36919011/how-to-add-debounce-time-to-an-async-validator-in-angular-2
  

  checkEmailDuplicate(email) {
    let res = timer(1000)
      .pipe(
        switchMap(() => {
          return this.http.get(`${environment.apiEndpoint}/validate/checkEmailDuplicate/${email}`);
        })
      );
      return res;
  }


  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.errors||!control.value) {
        return;
      }
      let result = this.checkEmailDuplicate(control.value)
        .pipe(
          map(res => {
            // if email is already taken
            console.log(res);
            if (!res["result"]) {
              // return error
              return { 'emailExists': true };
            }
          })
        );
      return result;
    };

  }


  retrieveReader(readerId){
    return timer(1000)
    .pipe(
      switchMap(() => {
        return this.http.get(`${environment.apiEndpoint}/api/admin/reader/${readerId}`);
      })
    );
  }

  readerValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      if (control.errors||!control.value) {
        return;
      }
      let result = this.retrieveReader(control.value)
        .pipe(
          map(res => {
            // if email is already taken
            console.log(res);
            if (!res["result"]) {
              // return error
              return { 'readerExists': false };
            }
          })
        );
      return result;
    };

  }

  checkout(payload){

// POST http://localhost:3000/api/lib/checkout/ HTTP/1.1
// content-type: application/json
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmdkb25nbGl5YW54aWFuZ0Bob3RtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIiwibGliIl0sImlhdCI6MTU1NjA0NzA5MiwiZXhwIjoxNTU2MDkwMjkyfQ.MqEGDtF0LJO8rCtcw3rss-l-dlS9varUG8xvg4-wRfk

// {
//     "bookId": "e4f6e6c7-9cb7-4ae5-8839-9062e3b32735",
//     "readerId": "5cbe2413c125b809ed038dfe"
// }
    return this.http.post(`${environment.apiEndpoint}/api/lib/checkout/`, payload);
  }
  checkin(payload)
  {
//     POST http://localhost:3000/api/lib/checkin/ HTTP/1.1
// content-type: application/json
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmdkb25nbGl5YW54aWFuZ0Bob3RtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIiwibGliIl0sImlhdCI6MTU1NjA0NzA5MiwiZXhwIjoxNTU2MDkwMjkyfQ.MqEGDtF0LJO8rCtcw3rss-l-dlS9varUG8xvg4-wRfk

// {
//     "bookId": "e4f6e6c7-9cb7-4ae5-8839-9062e3b32735"
// }
    return this.http.post(`${environment.apiEndpoint}/api/lib/checkin/`, payload);
  }
}
