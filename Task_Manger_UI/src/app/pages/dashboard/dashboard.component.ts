import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import Chart from 'chart.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as constant from 'src/app/shared/common-constants';
import { Task } from 'src/app/shared/models/task';
import { TaskService } from '../../shared/services/task.service';
import { CommonFunctions } from 'src/app/shared/functions/common.functions'

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
  taskData?: Task[];
  countData?: any[];
  opendata:any = 0;
  closeddata:any = 0;
  inProgressdata:any = 0;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns = [
    { columnDisplayName: 'Company ', columnDef: 'CompanyName', header: 'Company Name' },
    { columnDisplayName: 'User', columnDef: 'UserId', header: 'User Name' },
    { columnDisplayName: 'Task', columnDef: 'TaskName', header: 'Task Name' },
   
  ];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private CommonFunctions: CommonFunctions,
    private taskService: TaskService) { }

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
    this.getTaskData();
    this.StatusCountData();

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');
    parseOptions(Chart, chartOptions());

    // const data = {
    //   labels: [
    //     'Open',
    //     'Closed',
    //     'InProgress',
    //   ],
    //   options : {
    //   },
    //   datasets: [{
    //     label: 'My First Dataset',
    //     data: [this.opendata,this.closeddata],
    //     backgroundColor: [
    //       'rgb(255, 99, 132)',
    //       'rgb(54, 162, 235)',
    //       'rgb(255, 205, 86)',
    //     ],
    //     hoverOffset: 3
    //   }]
    // };
 
    // this.config = {
    //   type: 'pie',
    //   data: data,
    // };
    // console.log(this.config)
   
    //  this.ctx = document.getElementById('myChart');
    // const myChart = new Chart(this.ctx, this.config);
    this.displayedColumns = this.columns.map(x => x.columnDef);
    
  }

  getTaskData(): void {
    this.taskService.GetTasksByUserId().subscribe({
      next: (data: any) => {
        this.taskData = data.Data;
      },
      error: (e) => this.CommonFunctions.openSnackBar(e),
    })
  }

  StatusCountData(): void {
    this.taskService.GetStatusCount().subscribe({
      next: (mydata: any) => {
        this.countData = mydata.Data
        this.opendata = this.countData[0];
        this.closeddata = this.countData[1];
        this.inProgressdata = this.countData[2];
        
        const data = {
         labels: [
          'Open',
          'InProgress',
          'Closed',
        ],
        options : {
       },
        datasets: [{
          label: 'My First Dataset',
          data: [this.opendata,this.closeddata,this.inProgressdata],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 3
        }]
      };
 
    this.config = {
      type: 'pie',
      data: data,
    };
   
    this.ctx = document.getElementById('myChart');
        new Chart(this.ctx, this.config);
      },
      error: (e) => this.CommonFunctions.openSnackBar(e),
    })
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
