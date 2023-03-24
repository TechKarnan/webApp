import { Component } from '@angular/core';
import { WebappApiService } from '../webapp-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import * as bcrypt from "bcryptjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent {

  public result:Boolean;
  public btnClicked:Boolean=false;
  
  salt = bcrypt.genSaltSync(10);
  rawString = "Preethu@123";
  timestamp: string | number;
  key: string | number | undefined;
  encodedPass: string;
 
  

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })


  constructor(public webapi:WebappApiService){
  
  }

  
  public login(){
    let formdata = this.loginForm.value;
  this.timestamp = Date.now();
  this.key = this.salt;
  this.encodedPass = bcrypt.hashSync(formdata.password,this.key);

    
    this.webapi.isLogin(formdata.username,formdata.password).subscribe((data)=>{
      this.btnClicked =true;  
      let pswd = data;
      let res = bcrypt.compareSync(formdata.password,data)
      if(data)
      this.result = res?true:false;
      else
      this.result = false;
      console.log(pswd);
    })
  }
}
