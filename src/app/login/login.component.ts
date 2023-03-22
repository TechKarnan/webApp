import { Component } from '@angular/core';
import { WebappApiService } from '../webapp-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  public result:Boolean;
  public btnClicked:Boolean=false;

  constructor(public webapi:WebappApiService){

  }
  public login(){
    this.webapi.isLogin().subscribe((data)=>{
      this.btnClicked =true;  
      this.result = data;
    })
  }
}
