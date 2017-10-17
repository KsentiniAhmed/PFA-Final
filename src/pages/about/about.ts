import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Http} from '@angular/http';
import { Camera , File, Transfer, FilePath } from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
declare var cordova: any;



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
	lastImage: string = null;
  loading: Loading;

  //public base64Image: string;
   public path;
  public displayPhotoMenu:boolean;
  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController,private http : Http, public toastCtrl: ToastController, public platform: Platform, private app: App)
   {
           // this.filesToUpload = [];

  }
 filesToUpload: Array<string>;
 
 
   

    
     
  ionViewDidLoad() {
    console.log('Hello about Page');
                    }
 
  /**
  *  Open the camera device
  */
  public openCamera():void{

    	this.takePicture(Camera.PictureSourceType.CAMERA);
    	this.uploadImage();
  }

  /**
  *  Open the galery device
  */
  public openGalerie(){
                             this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);

   }   

 

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: true,
    correctOrientation: true
  };
 
  // Get the data of an image
  Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
      .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
  }

public createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
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
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
  var url = "http://192.168.1.11:8080/UploadPhoto/Upload?token="+localStorage.getItem("token");
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: true,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer = new Transfer();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('Image succesful uploaded.');
     console.log(JSON.stringify(data));
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
}
 logout(){
 //   this.auth.logout();
            localStorage.setItem("token",'0');

 this.app.getRootNav().setRoot(LoginPage);
}
}

