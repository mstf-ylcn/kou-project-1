import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonItem, IonItemSliding, IonList, MenuController, NavController, Platform, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import{userService} from '../userService'

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;

//https://github.com/ionic-team/capacitor/issues/1564
export function getFileReader(): FileReader {
  const fileReader = new FileReader();
  const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
  return zoneOriginalInstance || fileReader;
}
@Component({
  selector: 'app-cap',
  templateUrl: './cap.page.html',
  styleUrls: ['./cap.page.scss'],
})
export class CapPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private previewAnyFile: PreviewAnyFile,
    private storage:AngularFireStorage,
    private auth:AngularFireAuth,
    private fireDb:AngularFireDatabase,
    public userService:userService,
    private toastController:ToastController,
    private nav:NavController,
    private platform:Platform,
    private preview:PreviewAnyFile,
    private menu:MenuController
  ) { }

  @ViewChild('slidingItem') slidingList: IonItemSliding;
  
  ngOnInit() {

  }

  class1="stepper-item active";
  class2="stepper-item";
  class3="stepper-item";
  class4="stepper-item";
  content_class="";
  content_class2="none";
  content_class3="none";
  content_class4="none";
  content_class5="none";




   belgeler = [
     {belge_Ad:'Öğrenci belgesi',url:'',dosya_Ad:"",index:-1,isLoad:0},
     {belge_Ad:'ÖSYM sınav sonuç belgesi',dosya_Ad:"",url:'',index:-1,isLoad:0},
     {belge_Ad:'Transkript belgesi',dosya_Ad:"",url:'',index:-1,isLoad:0},
     {belge_Ad:'Dilekçe',url:'',dosya_Ad:"",index:-1,isLoad:0},
    ];
  

    fakulteler=[
      {fakulte:"Teknoloji Fakültesi"},
      {fakulte:"Hukuk Fakültesi"},
      {fakulte:"Eğitim Fakültesi"},
      {fakulte:"Mühendislik Fakültesi"},
      {fakulte:"Edebiyat Fakültesi"},
    ];

    bolumler=[
      "Bilişim Sistemleri Mühendiliği}",
      "Enerji Sistemleri Mühendiliği",
      "Biyomedikal Mühendiliği",
      'Otomotiv Mühendiliği'
    ]
 
  index;

  stepCounter=0;

  next()
  {
    if(this.stepCounter==0)
    {
      this.stepCounter++;
      this.class1="stepper-item completed"
      this.class2="stepper-item active"

      this.content_class="slide-out-left";
      // this.content_class="none";
      this.content_class2="slide-in-right";
      setTimeout(() => {
        this.content_class="none";
      }, 200);
    }
    else if(this.stepCounter==1 && this.notOrt.length==4 && this.okulPuan.length==6)
    {
        this.stepCounter++;
        this.class2="stepper-item completed";
        this.class3="stepper-item active";

        // this.content_class2="none";
        this.content_class2="slide-out-left";
        this.content_class3="slide-in-right";
        setTimeout(() => {
          this.content_class2="none";
        }, 200);
    }
    else if(this.stepCounter==2 )
    {
    var fileCounter=0;
      for (let index = 0; index <this.belgeler.length; index++) {
         if(this.belgeler[index].index!=-1)
         {
          fileCounter++;
         }
      }

   if(fileCounter==this.belgeler.length)
   {
    this.stepCounter++;
    this.class3="stepper-item completed"
    this.class4="stepper-item active"

    // this.content_class3="none";
    this.content_class3="slide-out-left";
    this.content_class4="slide-in-right";
    setTimeout(() => {
      this.content_class3="none";
    }, 200);
   }
    }
  }

  back()
  {
    
     if(this.stepCounter==1)
    {
      this.stepCounter--;
      this.class1="stepper-item active"
      this.class2="stepper-item"
    // this.content_class2="slide-out-right"; 
      this.content_class="slide-in-left";
      this.content_class2="none";
   
    }
    else if(this.stepCounter==2)
    {
        this.stepCounter--;
        this.class2="stepper-item active"
        this.class3="stepper-item"

        this.content_class2="slide-in-left";
        this.content_class3="none";
    }
    else if(this.stepCounter==3)
    {
        this.stepCounter--;
        this.class3="stepper-item active"
        this.class4="stepper-item"
        
        this.content_class3="slide-in-left";
        this.content_class4="none";
    }
  }


  counter=0;
  loadingControl=0;
  async onFileSelected(event,index) {
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setTimeout(() => {
    this.belgeler[index].index=index;
    setTimeout(() => {
      this.belgeler[index].isLoad=-1;
    }, 1200);
    }, 800);
    


    var dataControl=0;

   var typeIndex=event.target.files[0].name.lastIndexOf('.');
   var type=event.target.files[0].name.substring(typeIndex,event.target.files[0].name.length)
   var name=event.target.files[0].name.substring(0,typeIndex)

   console.log(name);

    
   console.log(event.target.files[0].type);

    var filename = event.target.files[0].name;
    this.belgeler[index].dosya_Ad=filename;

   console.log(filename);
    let fileReader = getFileReader();
    fileReader.readAsDataURL(event.target.files[0])

    fileReader.onload = () => {
     dataControl=1;

     this.uploadImage(fileReader.result,event.target.files[0].type,type,index,name);

     //uploaddan sonra calıstır
     
  

    }

   setTimeout(() => {
    if(dataControl!=1)
    {
      this.belgeler[index].index=-1;
      this.belgeler[index].isLoad=-1;
    }
   }, 200);

  
  }


  public openItemSlide(itemSlide: IonItemSliding, item: IonItem) {
      itemSlide.open('end');
}

// public deleteFile(i,belge_Ad) {
  
//   //alert koy

//   this.belgeler[i].index=-1;
//   console.log(belge_Ad);
// }

public closeItemSlide(item: IonItemSliding) {
    item.close();
}


disableBolum="true";
fakulte;
bolum="";
selectFakulte(event)
{
 this.fakulte=event.detail.value;
 this.disableBolum="false";
}
selectBolum(event)
{
  this.bolum=event.detail.value;
}

tercihler=[];
addItem()
{
  if(this.tercihler.length==0 && this.bolum!="" )
  {
  this.tercihler.push({fakulte:this.fakulte,bolum:this.bolum});
  this.bolum="";
  }
  else if(this.bolum!="")
  {
    var index=this.tercihler.findIndex(a=>a.bolum===this.bolum);
    if(index==-1)
    {
      this.tercihler.push({fakulte:this.fakulte,bolum:this.bolum});
      this.bolum="";
    }
  }

}

// deleteItem(index,bolum,fakulte)
// {
//   this.presentAlert(index,bolum,fakulte)

// }

okulPuan='';
notOrt='';

okulPuani(event)
{
  if(event.detail.value.length==3)
  {
  this.okulPuan=event.detail.value+'.';

  }
}
notOrtalamasi(event)
{
  if(event.detail.value.length==1)
  {
  this.notOrt=event.detail.value+'.';
  }
}


async bitir()
{
  if(this.tercihler.length!=0)
  
  {

  const alert = await this.alertController.create({
    cssClass: 'alert_css',
    header: 'Tercihlerinizi onaylıyor musunuz?',
    message: 'Geri dönüş yapılamayacaktır!',
    buttons: [
      {
        text: 'İptal',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Tamam',
        handler: () => {
            this.stepCounter++;
            this.class4="stepper-item completed"
          
            this.content_class4="slide-out-left";
            this.content_class5="slide-in-right";
            setTimeout(() => {
              this.content_class4="none";
            }, 200);

        }
      }
    ]
  });

  await alert.present();
}
  
}




async deleteItem(index,bolum,fakulte) {

  const alert = await this.alertController.create({
    cssClass: 'alert_css',
    header: 'Tercihinizi silmek istediğinizden emin misiniz?',
    message:    `<img  src="../../../assets/sc22.png"  alt="">`+
    `<ion-label class="text">${fakulte}</ion-label>`+'<br>' +
    `<img  src="../../../assets/book.png"  alt="">`+
    `<ion-label class="text">${bolum}</ion-label>`+'<br>',
    buttons: [
      {
        text: 'İptal',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Sil',
        handler: () => {
          this.tercihler.splice(index,1);
          this.bolum=bolum;
        }
      }
    ]
  });

  await alert.present();
}



async deleteFile(i,belge_Ad) {

  const alert = await this.alertController.create({
    cssClass: 'alert_css',
    message:   `<b>${belge_Ad}</b> Belgesini silmek istediğinizden emin misiniz?`,
    buttons: [
      {
        text: 'İptal',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Sil',
        handler: () => {
          this.belgeler[i].index=-1;
          this.belgeler[i].isLoad=0;

          this.belgeler[i].dosya_Ad="";
          this.belgeler[i].url="";
        }
      }
    ]
  });

  await alert.present();
}


time
data;
uploadImage(data,dataType,type,index,name)
{
 //dosya ismini degistirrrrrr 

 this.loadingControl=1;
  this.data=this.dataUrltoBlob(data,dataType);
  
 this.time=(new Date().toISOString().slice(0, 10)+" "+new Date().toTimeString().slice(0,5));
  console.log(this.time);
  //isim,data
 //  var upload= this.storage.upload("profilPic/"+`${this.data.email}_${this.time}.jpg`,this.uploadImg);
 var upload=this.storage.upload(`${name}`+type,this.data);
  upload.then(res=>{
    res.task.snapshot.ref.getDownloadURL().then(downloadableUrl=>{
     const slidingItem = document.getElementById('slidingItem' + index) as any;
   
     this.loadingControl=1;
     slidingItem.open('end');
      setTimeout(() => {
     slidingItem.close();
      }, 1200);
  
      this.belgeler[index].url=downloadableUrl;
      console.log(this.belgeler[index].url);

      //belgelere dosya ismi geleck.........
      // this.belgeler[index].dosya_Ad=
    }).catch(err=>{
      console.log(err);
    })
  })
}

previewFile(index)
 {
   this.previewAnyFile.preview(this.belgeler[index].url);
 }



dataUrltoBlob(dataURL,type)
{
let binary=atob(dataURL.split(',')[1]);
let array=[];

 for (let index = 0; index < binary.length; index++) {
 array.push(binary.charCodeAt(index));     
 }
 return new Blob([new Uint8Array(array)],{type:`${type}`});
} 




}
