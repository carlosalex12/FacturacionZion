import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/GserviceGPPD';

import { VariablesGlobalesService } from '../serviceMenu/variables-globales.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
l_Lemp=''
multiAxisData: any;
multiAxisOptions: any;
basicData: any;
basicOptions: any;
data: any;
chartOptions: any;
  constructor(
    private readonly _rutaDatos: ActivatedRoute,
    private _router:Router,
    private GlobalService:GlobalService,
    private Gvariables:VariablesGlobalesService

  ) { }

  ngOnInit(): void {
this.l_Lemp=this.Gvariables.g_Lemp;
   this.Gvariables.g_empid= {
     id: this._rutaDatos.snapshot.params
  };

  this.multiAxisData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

    datasets: [{
        label: 'Dataset 1',
        backgroundColor: [
            '#EC407A',
            '#AB47BC',
            '#42A5F5',
            '#7E57C2',
            '#66BB6A',
            '#FFCA28',
            '#26A69A'
        ],
        yAxisID: 'y',
        data: [65, 59, 80, 81, 56, 55, 10]
    }, {
        label: 'Dataset 2',
        backgroundColor: '#78909C',
        yAxisID: 'y1',
        data: [28, 48, 40, 19, 86, 27, 90]
    }]
};

this.multiAxisOptions = {
    plugins: {
        legend: {
            labels: {
                color: '#495057'
            }
        },
        tooltips: {
            mode: 'index',
            intersect: true
        }
    },
    scales: {
        x: {
            ticks: {
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: {
                min: 0,
                max: 100,
                color: '#495057'
            },
            grid: {
                color: '#ebedef'
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
                color: '#ebedef'
            },
            ticks: {
                min: 0,
                max: 100,
                color: '#495057'
            }
        }
    }
};
this.basicData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
      {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
          tension: .4
      },
      {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#FFA726',
          tension: .4
      }
  ]
};
this.data = {
  labels: ['A','B','C'],
  datasets: [
      {
          data: [300, 50, 100],
          backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ],
          hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
          ]
      }
  ]
};
  }


}





