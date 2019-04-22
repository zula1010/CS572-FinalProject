import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
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
  public list(page: number): Observable<LibrianApi> {
    const sub = this.http
      .get<LibrianApi>(`${environment.apiEndpoint}/api/admin/librian?page=${page}`);
    return sub;
  }

  public insertLibrian(data){
    return this.http.post(`${environment.apiEndpoint}/api/admin/librian`, data);
  }
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
}
