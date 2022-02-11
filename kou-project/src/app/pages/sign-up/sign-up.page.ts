import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoadingController, ToastController } from '@ionic/angular';

import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import{userService} from '../userService'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private sanitizer:DomSanitizer,private toastController:ToastController,
    private auth:AngularFireAuth,
    private fireDb:AngularFireDatabase,
    private storage:AngularFireStorage,
    private loadingController:LoadingController,
    private router:Router,
    private userService:userService) { }
  ngOnInit() {
    this.fireDb.database.ref().child("fakulte/").on('value',data=>{
      console.log(data.val());
      this.data=data.val();
      this.fakulteler=Object.keys(this.data);
      console.log(this.data["Teknoloji Fakültesi"]); 
     })


     //dersler
    //  this.fireDb.database.ref().child("dersler/").on('value',data=>{
    //   console.log(data.val()["Bilişim Sistemleri Mühendisliği"]);
    //  })
  }
  
   
  data;
  universiteler=[
    "Kocaeli Üniversitesi",
    "Sakarya Üniversitesi",
    "Biyomedikal Mühendiliği",
    'Marmara Üniversitesi',
   "Şeyh Edebali Üniversitesi"
  ]
  fakulteler;
  bolumler;




   pageControl=0;
   content_class="";
   content_class2="none";
   content_class3="none";

 
   name="";
   mail="";
   pw="";

   tel="";
   tc="";
   addres="";
   dTarih="";
   gender="";


   okul="";
   fakulte="";
   bolum="";
   sinif="";
   ogrNo="";

  //  slide-in-left
  async next()
  {
    if(this.pageControl==0 )
    {
      if(this.name!="" && this.mail!="" && this.pw!="" && this.photoControl==1 )
      {
      // await this.mailControl();
        if(this.controlMail==0)
        {
         this.content_class="none";
         this.content_class2= "slide-in-right";
         this.pageControl++;
         this.uploadImage(this.dataUrl);
        }
        else if(this.controlMail==1)
        {
          this.presentToastAlert();
        }


      }
      else if(this.photoControl!=1)
      {
       this.presentToastPhoto();

      }
      else
      {
       this.presentToast();
      }
 
    }
    else if(this.pageControl==1) //2. sayfa
    {
      if(this.tel.length==10 && this.tc.length==11 && this.addres!=""  && this.dTarih!="" && this.gender!="")
      {
   
        if(this.controlTc==0 && this.controlTel==0)
        {
          this.content_class2="none";
          this.content_class3= "slide-in-right";
          this.pageControl++;
          console.log("test");
        }
        else if(this.controlTc==1 || this.controlTel==1)
        {
        this.presentToastExist();
        }
  
      }
     else
     {
       this.presentToast();
     }
    }
   
  }

  userType="";
  bitir()
  {

      if(this.okul!="" && this.fakulte!="" && this.bolum!="" && this.sinif!="")
      {
        if(this.guestControl==1)
        {
      
          if(this.ogrNo.length==9)
          {
            if(this.controlOgrNo==0)
            {

        //kayıt bitir kocaelili
              console.log("bitti");
             this.userType="1"
            this.singup();
            }
            else if(this.controlOgrNo==1)
            {
            this.presentToastExist();
            }
   

          }
          else
          {
          this.presentToast();
          }
        }
        else
        {
          //guest kocaeelili degil
          this.userType="2";
          this.ogrNo="-";
          this.singup();
            console.log("bitti");
        }
   
      }
      else
      {

        this.presentToast();
      }
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







  guestControl=0;
  disableFakulte=true;
  disableBolum=true;
  disableSinif=true;
  

  selectOkul(event)
  { 
    this.bolum="";
    this.sinif="";
    this.fakulte="";

    this.disableFakulte=false;

    this.disableBolum=true;
    this.disableSinif=true;

    this.okul=event.detail.value;

    if(event.detail.value=="Kocaeli Üniversitesi")
    {
      this.guestControl=1;
    }
    else
    {
      this.guestControl=0;
    }
  }

  selectFakulte(event)
  {

    this.disableSinif=true;
    this.bolum="";
    this.sinif="";
    this.fakulte=event.detail.value;
    this.disableBolum=false;
    this.bolumler=this.data[this.fakulte];


  }


  selectBolum(event)
  {
  this.sinif="";
  this.bolum=event.detail.value;
  console.log(event.detail.value);
  this.disableSinif=false;
  }

  selectSinif(event)
  {
    this.sinif=event.detail.value;
    console.log(event.detail.value);
  }

  
changeGender(event)
{
  console.log(event.detail.value);
  this.gender=event.detail.value;
}
 
test="";
changeDate(event)
{
   this.dTarih=event.detail.value.substring(0,10);
   console.log(this.dTarih);
  // this.dTarih=event.detail.value;
}

  ppUrl;
  dataUrl;
  photoControl=0;
  async getCamera()
{
  const image= await Camera.getPhoto({
    quality:70,
    allowEditing:false,
    resultType:CameraResultType.DataUrl,
    source:CameraSource.Prompt,
    saveToGallery:true,
    preserveAspectRatio:true,
    width:1080,
    height:1080,
    promptLabelPhoto:'Galeriden Seç',
    promptLabelPicture:'Fotoğraf Çek'
  }).then(res=>{
    this.photoControl=1;
    this.ppUrl= this.sanitizer.bypassSecurityTrustResourceUrl(res && (res.dataUrl));
    this.dataUrl=this.dataUrltoBlob(res.dataUrl);

  }).catch(e=>{
    alert(e);
  })
}


dataUrltoBlob(dataURL)
{
let binary=atob(dataURL.split(',')[1]);
let array=[];

 for (let index = 0; index < binary.length; index++) {
 array.push(binary.charCodeAt(index));     
 }
 return new Blob([new Uint8Array(array)],{type:'image/png'});
} 


async presentToast() {
  const toast = await this.toastController.create({
    message: `Lütfen bütün alanları doldurunuz!`,
    duration: 1500,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
}

async presentToastExist() {
  const toast = await this.toastController.create({
    message: `Böyle bir kullanıcı mevcut!`,
    duration: 1500,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
}

async presentToastPhoto() {
  const toast = await this.toastController.create({
    message: `Lütfen fotoğrafınızı yükleyiniz!`,
    duration: 1500,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
}


async presentToastAlert() {
  const toast = await this.toastController.create({
    message: `Kullanıcı zaten mevcut!`,
    duration: 1500,
    position: 'middle',
    cssClass: 'toast'
  });
  toast.present();
}


controlMail=-1;
mailControl() {
  
   this.fireDb.database.ref().child("users").orderByChild("email").equalTo(`${this.mail}`).once("value",snapshot => {
    if (snapshot.exists()){
      this.controlMail=1;
     }
    else
    {
      this.controlMail=0;
    }
});
}


controlTc=-1;
tcControl() {
  
   this.fireDb.database.ref().child("users").orderByChild("tc").equalTo(`${this.tc}`).once("value",snapshot => {
    if (snapshot.exists()){
      this.controlTc=1;
     }
    else
    {
      this.controlTc=0;
    }
});
}

controlTel=-1;
telControl() {
  
   this.fireDb.database.ref().child("users").orderByChild("tel").equalTo(`${this.tel}`).once("value",snapshot => {
    if (snapshot.exists()){
      this.controlTel=1;
     }
    else
    {
      this.controlTel=0;
    }
});
}

controlOgrNo=-1;
ogrNoControl() {
    
   this.fireDb.database.ref().child("users").orderByChild("ogrNo").equalTo(`${this.ogrNo}`).once("value",snapshot => {
    if (snapshot.exists()){
      this.controlOgrNo=1;
     }
    else
    {
      this.controlOgrNo=0;
    }
});
}


//userType  ==0 admin   ==1 kocaeli    ==2 farklı okul
singup(){
  this.present();
  this.auth.createUserWithEmailAndPassword(this.mail,this.pw).then(res=>{
   this.fireDb.object('users/'+res.user.uid).set({
     uid:res.user.uid,
     name:this.name,
     email:this.mail,
     tel:this.tel,
     adres:this.addres,
     tc:this.tc,
     dTarih:this.dTarih,
     cinsiyet:this.gender,
     okul:this.okul,
     fakulte:this.fakulte,
     bolum:this.bolum,
     sinif:this.sinif,
     userType:this.userType,
     pp:this.ppUrl,
     ogrNo:this.ogrNo,
   }).catch(err=>{
     this.presentToastAlert();
   })
   this.fireDb.database.ref().child("users/").child(`/${res.user.uid}`).on('value',data=>{
    // this.user.userArray=data.val();
    //dataları al
    this.userService.userData=data.val();
    this.userService.componentControl=1;
   
    this.pageControl=0;
    this.content_class2="none";
    this.content_class3="none";

    this.router.navigateByUrl('/home');

    })
  }).then(res=>{
    this.dismiss();


  }).catch(err=>{
    this.dismiss();
    alert(err);
  })
  
}

time;
uploadImage(dataUrl)
{
 this.time=(new Date().toISOString().slice(0, 10)+" "+new Date().toTimeString().slice(0,5));
  console.log(this.time);
  var upload= this.storage.upload("profilPic/"+`${this.mail}_${this.time}.jpg`,dataUrl);
  upload.then(res=>{
    res.task.snapshot.ref.getDownloadURL().then(downloadableUrl=>{
      this.ppUrl=downloadableUrl;
    })
  })
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

}
