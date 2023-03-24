import { Component } from '@angular/core';
import * as bcrypt from "bcryptjs";
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { WebappApiService } from '../webapp-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  salt = bcrypt.genSaltSync(10);
  rawString = "Preethu@123";
  timestamp: string | number;
  key: string | number | undefined;
  encodedPass: string;
  formData:any;
  
  constructor(public webapi:WebappApiService){

  }

  result ='';

  registerForm = new FormGroup({
    email: new FormControl(),
    passwd: new FormControl(),
    repasswd: new FormControl(),
  })


  public register(){
    this.formData = this.registerForm.value; 
    if(this.formData.passwd){
    console.log(this.registerForm.value);
    this.timestamp = Date.now();
    this.key = this.salt;
    this.encodedPass = bcrypt.hashSync(this.formData.passwd, this.key);
    console.log(this.encodedPass);
    console.log(
      "Compare passwords: ",
      bcrypt.compareSync(this.rawString, this.encodedPass)
    );
    console.log("username :",this.formData.email);
    console.log("passwd :",this.formData.passwd);
    let data ={
      username:this.formData.email,
      password:this.encodedPass,
    }
    this.webapi.register(data).subscribe((data)=>{
        if(data){
          this.result = "SuccessFully Registered..!";
        }
        else{
          this.result = "Something went Worng..!";
        }
    });
  }
}
}
