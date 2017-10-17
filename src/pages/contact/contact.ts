import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { Http} from '@angular/http';
import {HttpProvider} from '../../providers/http-provider';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[HttpProvider]
})
export class ContactPage {


  constructor(public navCtrl: NavController, private app: App, private http : Http,  private httpProvider:HttpProvider) 
  {}
 patdata = new Array(); 
 datedata = new Array(); 
 newsData;
  mesphoto(){
       let link = "http://192.168.1.151:8080/UploadPhoto/Photos?token="+localStorage.getItem("token");
      this.http.get(link)
        .map(res => res.json())
        .subscribe(data =>{
          console.log("succeé d'aller à la servlet");
          console.log(data);
          let i=0;
          while (data[i] != null){
          this.patdata[i]= data[i].url;
          this.datedata[i]= data[i].date;
           i++;}
        },error => {
          //this.presentToast('verifier la connection!!');
          console.log("error ");
        });
  }
   
  /*getdata(){
  this.httpProvider.getJsonData().subscribe(
    result => {
      this.newsData=result.data.children;
      console.log("Success : "+this.newsData);
    },
    err =>{
      console.error("Error : "+err);
    } ,
    () => {
      console.log('getData completed');
    }
  );
}
  /*	        this.filesToUpload = [];

  }
 filesToUpload: Array<File>;
 
 
    upload() {
        this.makeFileRequest('http://192.168.1.11:8080/UploadPhoto/Upload',[], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
 
    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    }*/
    logout(){
 //   this.auth.logout();
 this.app.getRootNav().setRoot(LoginPage);
           localStorage.setItem("token",'0');

    //this.navCtrl.setRoot(LoginPage);
}

 }

