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
}
