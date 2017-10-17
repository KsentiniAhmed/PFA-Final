import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Http} from '@angular/http';
import { Camera } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';


@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  public base64Image: string;
   public path;
  public displayPhotoMenu:boolean;
  constructor(public navCtrl: NavController,private http : Http, public toastCtrl: ToastController, private app: App)
   {
            this.filesToUpload = [];
    //if (!localStorage.getItem("token")) 
      // this.app.getRootNav().setRoot(LoginPage);


  }
 filesToUpload: Array<string>;
 
 
   

    /*fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
 ///.html ::(change)="fileChangeEvent($event)"
 */
    makeFileRequest(url: string, params: Array<string>, path) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
                formData.append("file", path);
            
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
    }
     
  ionViewDidLoad() {
    console.log('Hello Camera Page');
                    }
 
  /**
  *  Open the camera device
  */
  public openCamera():void{
 
    let option = {
      allowEdit: true,
      quality: 100,
      sourceType:Camera.PictureSourceType.CAMERA,
      destinationType:Camera.DestinationType.NATIVE_URI,  /*DATA_URL to upload */
      correctOrientation:true,
      saveToPhotoAlbum:true
    };
 
    Camera.getPicture(option).then((path) => {
      this.path = path;
      this.displayPhotoMenu = true;

  this.makeFileRequest('http://127.0.0.1:8080/UploadPhoto/Upload?token='+localStorage.getItem("token"),[],path).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });

              });
    


  }

  /**
  *  Open the galery device
  */
  public openGalerie():void{
 
    let option = {        
      allowEdit: true,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:Camera.DestinationType.NATIVE_URI,
      correctOrientation:true,
      saveToPhotoAlbum:true
    };
 
    Camera.getPicture(option).then((path) => {
      this.path = path;
      this.displayPhotoMenu = true;
    });
  }   
public uploadPhoto() {
  this.filesToUpload= this.path;
 this.makeFileRequest('http://192.168.1.8:8080/UploadPhoto/Upload',[], this.filesToUpload).then((result) => {
            console.log(result);
        }, (error) => {
            console.error(error);
        });

}
 

public presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
} 
 logout(){
 //   this.auth.logout();
            console.log(localStorage.getItem("token"));

           localStorage.setItem("token",'0');
           console.log(localStorage.getItem("token"));
 this.app.getRootNav().setRoot(LoginPage);
}
}

