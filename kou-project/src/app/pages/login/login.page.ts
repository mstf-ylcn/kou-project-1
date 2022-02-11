import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { userService } from '../userService';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage   {

  constructor(private router:Router,
    private toastController:ToastController,private menu:MenuController,
    private afAuth:AngularFireAuth,
    private fireDb:AngularFireDatabase,
    private loadingController:LoadingController,
    private ngZone: NgZone,
    private userService:userService,
    private storage:AngularFireStorage,

   ) {



    }

  ngOnInit() {
    this.menu.enable(false);

  }





  // async  readSecretFile() {
  //   const contents = await Filesystem.readFile({
  //     path: 'aaa.pdf',
  //     directory: Directory.Documents,
  //   }).then(a=>{
  //     alert("doru");
  //     var upload= this.storage.upload("test.pdf",contents);

  //   }).catch(err=>{
  //     console.log(err);

  //   });
  //   var a= this.dataUrltoBlob(contents)

  // }


  dataUrltoBlob(dataURL)
{
let binary=atob(dataURL.split(',')[1]);
let array=[];

 for (let index = 0; index < binary.length; index++) {
 array.push(binary.charCodeAt(index));     
 }
 return new Blob([new Uint8Array(array)],{type:`application/pdf`});
} 


  home()
  {
this.router.navigateByUrl('/home');
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
 
    twitter()
    {
      window.open("https://twitter.com/kou92official",'_system','location=yes');
    }
    youtube()
    {
      window.open("https://www.youtube.com/channel/UCNYjYvhf_oa3fFgU0-nwE_Q",'_system','location=yes');

    }
    instagram()
    {
      window.open("https://www.instagram.com/kou92official",'_system','location=yes');

    }

    google()
    {
      window.open("https://www.instagram.com/kou92official",'_system','location=yes');

    }
    facebook()
    {
      window.open("https://tr-tr.facebook.com/kou92official/",'_system','location=yes');

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

  
  datamail;
  mailData(event)
  {
   let val =event.target.value;
   this.datamail=val;
   console.log(val);
  }
 

  async resetPw()
  {
    try
    {
    await this.afAuth.sendPasswordResetEmail(this.datamail).then(data=>{
    })
   }
   catch{

   }
   this.presentToastResetPw();
  }

  async presentToastResetPw() {
    const toast = await this.toastController.create({
      message: `Email adresinizi kontrol ediniz!`,
      duration: 1500,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
  }

  mail="";
  pw="";

 async login()
  {
    this.present();
    await this.afAuth.signInWithEmailAndPassword(this.mail,this.pw).then(data=>{
      this.fireDb.database.ref().child("users/").child(`/${data.user.uid}`).on('value',data=>{
      this.userService.userData=data.val();
       this.userService.pw=this.pw;
      this.userService.componentControl=1;

      this.dismiss();
      this.mail="";
      this.pw="";
      if(data.val().userType==0)
      {
        console.log("admin");
        this.ngZone.run(async ()=>{
          this.router.navigateByUrl('/admin');
        })
      }
      else
      {
        console.log("normal");
        this.ngZone.run(async ()=>{
          this.router.navigateByUrl('/home');
        })
      }
 
      })
    }).catch((err)=>{
      this.dismiss();
      this.presentToast();
    })

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

 
  isLoading;
  async present() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'transparent',
      backdropDismiss: true,
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then();
        }
      });
    });
  }
  
  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: `Kullanıcı adı veya şifre yanlış. Bilgilerinizi kontrol ediniz!`,
      duration: 1500,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
  }

}
