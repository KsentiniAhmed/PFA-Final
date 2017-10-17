import { Component } from '@angular/core';
import { Http} from '@angular/http';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {TabsPage} from '../tabs/tabs';
//import {UploadService} from '../../services/upload.service';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
    


    // static get parameters(){
      //  return [[NavController]];  
    //}
      private user : FormGroup;
  public data : any;
  constructor( private formBuilder: FormBuilder, private http : Http, private NavController : NavController, public toastCtrl: ToastController ) {
    this.user = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  logForm(){
    //////////////

    //////////////
    console.log(this.user.value);
    let name =this.user.value.username;
    let pass = this.user.value.password;
    let data = JSON.stringify({name, pass});
    /*ou on peut ajouter header et le upload de l'image reste simple sans transfermer en json le string qui le recoit*/
    console.log(data);
    let link = "http://192.168.1.151:8080/UploadPhoto/Auth";
    this.http.post(link, data)
        .map(res => res.json())
        .subscribe(data =>{
          console.log("succeé d'aller à la servlet");
          console.log(data);
          let token=data.token;
          localStorage.setItem("token",token);

          if (data.token=="") {console.log("the username or password is false" );
                                   this.presentToast('the username or password is false');
                                  }
             else {this.presentToast('login avec succeé');
                       this.NavController.setRoot(TabsPage);
                  }

        },error => {
          this.presentToast('verifier la connection!!');
          console.log("error login");
        });
  }
    

    onSubmit(){
      console.log('connecter avec succeé');
     
    

      // var upload = {
       //}
       
       // Add Workout 
       /*this.uploadService.addImage(upload).subscribe(data => {
           this.result = data
       },
       err => console.log(err),
       () => console.log('Image Added'));
       */
      // this.NavController.setRoot(LoginPage);
    }
    public presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}

}