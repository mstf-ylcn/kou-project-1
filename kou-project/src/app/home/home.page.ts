import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router,
    private toastController:ToastController,) {}

  home()
  {
this.router.navigateByUrl('/test');
  }

  duyurular()
  {
this.router.navigateByUrl('/duyurular');
  }

  basvurular()
  {
    this.router.navigateByUrl('/basvurular');
  }

  basvuru()
  {
    this.router.navigateByUrl('/progresive');
  }

  git()
  {
    this.router.navigateByUrl('/cam');
  }


  hidePage=0;

  forgetPw()
  {
    this.hidePage=1;
  }

  backLogin()
  {
    this.hidePage=0;
  }

  
  singup()
  {
    this.router.navigateByUrl('sign-up');
  }


  password_type="password";
  show = false;
  hide=1;

  show_pw()
  {
   if(this.show){
     this.password_type="text";
     this.show=false;
     this.hide=0;
   } 
   else
   {
    this.show=true;
     this.password_type="password";
     this.hide=1;

   }
  }

  async resetPw()
  {
    try
    {

    // await this.afAuth.sendPasswordResetEmail(this.datamail).then(data=>{
    // })
   }
   catch{

   }
   this.presentToast2();

  }


  async presentToast2() {
    const toast = await this.toastController.create({
      message: `Email adresini kontrol ediniz.`,
      duration: 1500,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
  }

}
