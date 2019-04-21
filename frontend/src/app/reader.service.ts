import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ReaderService {
    constructor(private http: HttpClient, private router: Router) {
    }
    addReader(data) {
        return this.http.post("http://localhost:3000/reader/add", data);
    }
    updateReader(data) {
        return this.http.put("http://localhost:3000/reader/update", data);
    }
    deleteReader(data) {
        return this.http.delete("http://localhost:3000/reader/delete", data);
    }
    getReader() {
        return this.http.get("http://localhost:3000/reader");
    }

}
