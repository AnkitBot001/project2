import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { user } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:3000/user';

  public URL = 'http://localhost:3001/api/users';

  users() :Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }

  postData(formData:any){
    console.log(formData,"this is from post service");
    return this.http.post(this.url,formData)
  }

  deleteData(id:any){
    console.log("Id of service", id);   
    return this.http.delete(`http://localhost:3000/user/${id}`);
  }

  editUser(id:any):Observable<user>{
    return this.http.get<user>(`http://localhost:3000/user/${id}`)
  }

  updateUserInfo(user:user){
    const obj = {email:user.email, username:user.username, id:user.id}
    return this.http.patch<user>(`http://localhost:3000/user/${user.id}`,obj)
  }

  patchMethod(user:user){
    const obj = {email:user.email, username:user.username, id:user.id}
    return this.http.patch<user>(`http://localhost:3000/user/${user.id}`,obj)
  }

  getDataFromApi(user:user){
    return this.http.get(`http://localhost:3000/user/${user.id}`)
  }

  getUserList(form:any){
    const queryParams = new HttpParams({ fromObject: form });
    const API_URL = `${this.URL}/getuserlist`;
    return this.http.get(API_URL, { params: queryParams })
  }

  deleteUserById(id:string){
    const API_URL = `${this.URL}/delete/${id}`;
    return this.http.delete(API_URL)
  }

  signUp(form:any){
    const API_URL = `${this.URL}/signup`;
    return this.http.post(API_URL, form)
  }

  onButtonClick = new Subject
}


