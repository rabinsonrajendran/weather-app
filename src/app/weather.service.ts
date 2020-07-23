import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather?';
  apiKey = 'c2fa62c42bd6efd3675a365fce3828c0';

  // https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c2fa62c42bd6efd3675a365fce3828c0
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getWeatherDataByCoords(lat, lon) {
    const params = new HttpParams()
        .set('lat', lat)
        .set('lon', lon)
        .set('units', 'imperial')
        .set('appid', this.apiKey);
    return this.http.get(this.url, {params});
  }

  // tslint:disable-next-line:typedef
  getWeatherDataByCityName(city): Observable<any> {
    const path = `${this.url}q=${city}&units=metric&APPID=${this.apiKey}`;
    return this.http.get<any>(path).pipe(
      map(data => ({
        ...data})
        ),
        delay(500)
      );
  }

}
