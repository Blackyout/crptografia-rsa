import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  logueado:boolean;
  
  siRegister = "none";
  exito="{message: 'Inicio de sesión exitoso'}";

  constructor(private dataService: ApiService,private router:Router) {
    if(this.dataService.isLoggedIn())
  {
  console.log("loggedin");
  this.logueado=true
  }else{
    this.logueado=false
    this.router.navigateByUrl('/login');
    }
   }

  ngOnInit(): void {
    this.siRegister = "block";
  }

  closeModal(){
    this.siRegister = "none";
  }

}
