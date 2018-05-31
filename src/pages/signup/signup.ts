import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Loading, LoadingController,
  Alert, AlertController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  // global variable
  public loading: Loading;
  public signupForm: FormGroup;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController) {

      //validasi form
      this.signupForm = formBuilder.group({
        email:[
          '', //mendeteksi 
          Validators.compose([Validators.required])
        ],
        password:[
          '',
          Validators.compose([Validators.required, Validators.minLength(6)])
        ]
      });
  }

  //proses signup user baru
  signupUser(): void {
    // cek apakah form login sudah valid atau belum
    if (!this.signupForm.valid) {   // jika belum valid
      console.log(`Form belum valid: ${this.signupForm.value}`);
    } else {    // jika sudah valid
      // baca nilai input yg ada di form
      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      // cocokkan dengan yg ada di firebase
      this.authProvider.loginUser(email, password).then(
        authData => {     // resolve
          this.loading.dismiss().then(() => {
            this.navCtrl.setRoot(HomePage);
          });
        },
        error => {        // reject
          this.loading.dismiss().then(() => {
            const alert: Alert = this.alertCtrl.create({
              message: error.message,
              buttons: [{
                text: 'OK', role: 'cancel'
              }]
            });
            alert.present();
          });
        }
      );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
