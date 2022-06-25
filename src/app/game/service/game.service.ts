import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiPort = environment.apiPort.toString() || '9090';

  apiVersion = environment.apiVersion || 'v0';

  apiUrl = environment.apiUrl.replace('port', this.apiPort).replace('version', this.apiVersion);

  constructor(private http: HttpClient) { }

  checkForActiveGame(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.apiUrl + `/game/active`, {observe: 'response'});
  }

  createGame(): Observable<HttpResponse<any>> {

    return this.http.post<HttpResponse<any>>(this.apiUrl + `/game/`, {}, {observe: 'response'});

  }

  getGameByID(gameID: number): Observable<any> {

    return this.http.get<HttpResponse<any>>(this.apiUrl + `/game/` + gameID);
  }
}
