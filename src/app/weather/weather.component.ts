import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  lat;
  lon;
  weatherData: any = [];
  arrName: any = [];
  showTile = false;
  iconUrl = 'http://openweathermap.org/img/wn';

  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getLocation();
  }

  // tslint:disable-next-line:typedef
  getLocation(){
    if ('geolocation' in navigator){
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherService.getWeatherDataByCoords(this.lat, this.lon)
      .subscribe
        (data => {
          // this.weather = JSON.stringify(data);
          console.log(data);
        });
      });
    }
  }

  // tslint:disable-next-line:typedef
  getCity(city){
    if (this.weatherData.length > 0){
      let temp = new Set(this.arrName);
      if ([...temp].includes(city)) {
        this.alertFun(city);
      } else {
        this.fetchWeatherData(city);
      }
    } else {
      this.fetchWeatherData(city);
    }

  }

  alertFun(city): void{
    alert(`${city} is already exist`);
  }

  fetchWeatherData(city): any{
    this.weatherService.getWeatherDataByCityName(city)
      .subscribe( (data: any) => {
        this.lat = data.coord.lat;
        this.lon = data.coord.lon;
        if (this.weatherData.length < 4) {
          this.weatherData.push(data);
          this.weatherData.forEach(element => {
            this.arrName.push(element.name.toLowerCase());
          });
          this.showTile = true;
        } else {
          this.weatherData.shift();
          this.weatherData.push(data);
          this.weatherData.forEach(element => {
            this.arrName.push(element.name.toLowerCase());
          });
          this.showTile = true;
        }
        // console.log(JSON.stringify(this.weatherData));
      });
  }

  goToNew(url){
    window.open('https://en.wikipedia.org/wiki/' + url, '_blank');
  }

}
