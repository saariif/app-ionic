import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  //global variable
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public authProvideer: AuthProvider,
    public alertCtrl : AlertController,
    public formBuilder : FormBuilder) {

      // validasi form
      this.resetPasswordForm = formBuilder.group({
        email:[
          '',
          Validators.compose([Validators.required])
        ]
      });
  }
   //fungsi untuk reset password
   resetPassword(): void{
    // cek validasi form
    if(!this.resetPasswordForm.valid){
      console.log('Form belum Valid: ${this.resetPasswordForm.value}');
    }else{
      const email: string = this.resetPasswordForm.value.email;

      //panggil fungsi reset password
      this.authProvideer.resetPassword(email).then(
        user=>{
          const alert: Alert = this.alertCtrl.create({
            message: "Cek email untuk reset password",
            buttons :[
              {
                text: 'OK',
                role: 'cancel',
                handler: () =>{
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();
        },
        error => {
          const alertError = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'OK', role: 'cancel' }]
          });
        }
      )
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
