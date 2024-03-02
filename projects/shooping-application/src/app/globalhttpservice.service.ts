import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aboutformdata } from './aboutformdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalhttpserviceService {

  /*==============================main dependency================================ */
  private BaseUrl: string = "http://localhost:8080/api/";
  constructor(private http: HttpClient) { }
  /*==============================About as service================================ */

  saveaboutform(data: Aboutformdata): Observable<object> {
    return this.http.post(`${this.BaseUrl}` + 'saveAboutFormData', data);
  }

  /*==============================carrer as service================================ */
  getJobs(): Observable<any> {
    return this.http.get(`${this.BaseUrl}` + 'jobs');
  }
  getCountry(): Observable<any> {
    return this.http.get(`${this.BaseUrl}` + 'country');
  }
  getState(stateId: any): Observable<any> {
    return this.http.get(`${this.BaseUrl}state/${stateId}`);
  }
  getCity(cityId: any): Observable<any> {
    return this.http.get(`${this.BaseUrl}city/${cityId}`);
  }
  getVillage(villageId: any): Observable<any> {
    return this.http.get(`${this.BaseUrl}village/${villageId}`);
  }
  applyJob(frmsave:any):Observable<any>{
    alert(JSON.stringify(frmsave));
    return this.http.post(`${this.BaseUrl}` + 'applyJob', frmsave);
  }
  /*==============================material as service================================ */

}
