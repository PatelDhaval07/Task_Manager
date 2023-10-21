import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import Chart from 'chart.js';
import * as constant from 'src/app/shared/common-constants';
import { UserService } from '../../layouts/auth-layout/services/user.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  ctx : any;
  config : any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public authToken: string = "";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.authToken = this.route.snapshot.paramMap.get('AuthToken');
    if (this.authToken) {
      localStorage.setItem("AuthToken", this.authToken);
      this.router.navigate([constant.FrontDashboard]);
    }

    if (localStorage.getItem("AuthToken")) {
      this.router.navigate([constant.FrontDashboard]);
    }
    else {
      this.router.navigate([constant.FrontLogin]);
    }

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
    // 	type: 'line',
    // 	options: chartExample1.options,
    // 	data: chartExample1.data
    // });
    
    const data = {
      labels: [
        'Closed',
        'Open',
        'InProgress',
        'Reopen',
      ],
      options : {
      },
      datasets: [{
        label: 'My First Dataset',
        data: [2, 3, 1, 2],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(82, 255, 160)'
        ],
        hoverOffset: 4
      }]
    };
    // </block:setup>
    
    // <block:config:0>
    this.config = {
      type: 'pie',
      data: data,
    };
    // </block:config>
    
    // module.exports = {
    //   actions: [],
    //   config: config,
    // };
    this.ctx = document.getElementById('myChart');
    const myChart = new Chart(this.ctx, this.config);
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
