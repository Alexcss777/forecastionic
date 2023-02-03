import { Component, ViewChild, ElementRef } from '@angular/core';
import {Chart,registerables} from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from './weather-data.interface';
Chart.register(...registerables);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  @ViewChild('temperatureChart')
  temperatureChart!: ElementRef;
  
  constructor(private http: HttpClient) {}
 

  ngOnInit() {
    this.http.get<WeatherData>(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/241912?apikey=%09PIAcz5bZ3LStSpLy1GsG10hXdqdQcSD3`)
    .subscribe(data => {
      const tempData = data.DailyForecasts[0]['Temperature']['Minimum']['Value'];
      this.createLineChart(tempData);
    });
  }
  
  createLineChart(tempData: number) {
    let ctx = this.temperatureChart.nativeElement.getContext('2d');
    let chartData = [tempData];
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Current'],
        datasets: [{
          label: 'Temperature (Celsius)',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: chartData,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero:true
            
            
          }
        }
      }
    });
  }
}
