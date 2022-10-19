import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  @Output() postTrigger: EventEmitter<any> = new EventEmitter();

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      'access-control-allow-origin': '*'
    })
  };

  API_POST_URL = 'https://jsonplaceholder.typicode.com/posts/';
  API_POST_USERS = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private readonly http: HttpClient) { }
  
  getPosts(): Observable<any> {
    return this.http.get(this.API_POST_URL).pipe(retry(3));
  }

  getUsers(): Observable<any> {
    return this.http.get(this.API_POST_USERS).pipe(retry(3));
  }

  createPost(_post: any): Observable<any> {
    return this.http.post(this.API_POST_URL, _post, this.httpOptions).pipe(retry(3));
  }

  updatePost({id, ...props}): Observable<any> {
    return this.http.put(`${this.API_POST_URL}${id}`, ({id, props}), this.httpOptions).pipe(retry(3));
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.API_POST_URL}${id}`, this.httpOptions).pipe(retry(3));
  }
}
