import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WebappApiService } from '../webapp-api.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  font:any;
  page = 0;
  size =9;
  productsData:any;
  
  constructor(public webapi:WebappApiService){

  }

  ngOnInit(): void {
    this.font =this.calculateEntypo("0335");
    console.log(this.font);
    
    this.webapi.getProducts(this.page,this.size).subscribe((data)=>{
      this.productsData = data;
      console.log(this.productsData);
    })
  }

  catalogForm = new FormGroup({
    name: new FormControl(),
    image: new FormControl(),
  })
  selectedFiles:any;
  currentFileUpload: any;
  

  submit(){
    let formdata = this.catalogForm.value;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(formdata);
  }

  selectFile(event:any){
    console.log(event.target.files);
    this.selectedFiles = event.target.files;
  }

  calculateEntypo(input:any) {
    var num = Number(input);
    // console.log(num);
    var num1 = Math.floor(num / 100);
    var num2 = num % 100;
    if (num1 > 93) {
      num1 = num1 + 33 + 104;
    } else {
      num1 = num1 + 33;
    }

    if (num2 > 93) {
      num2 = num2 + 33 + 104;
    } else {
      num2 = num2 + 33;
    }
    // console.log("res1: " + num1+ ", res2: "+ num2);
    var res1 = String.fromCharCode(num1);
    var res2 = String.fromCharCode(num2);
    return res1 + '' + res2;
  }

  
  
}
