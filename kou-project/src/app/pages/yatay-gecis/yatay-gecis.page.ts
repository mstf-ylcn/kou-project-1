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
  selector: 'app-yatay-gecis',
  templateUrl: './yatay-gecis.page.html',
  styleUrls: ['./yatay-gecis.page.scss'],
})
export class YatayGecisPage implements AfterViewInit {
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
    this.time=(new Date().toISOString().slice(0, 10));
    


    // for (let index = 0; index < this.belgeler.length; index++) {
    //   data.push({belgeAd:`${this.belgeler[index].belge_Ad}`,url:`${this.belgeler[index].url}`})          
    // }


    // //yatay_Gecis_ UId   pushId
    // this.fireDb.database.ref('test/222/432/').set({
    //   durum:'beklemede',
    //   ortalama:'2.22',
    //   okulPuan:'323',
    //   belgeler:data,
    //   tarih:this.time,
    //   uid:'23232332',
    //   basvuruTipi:'yatay'
    // })
    
  
    // this.fireDb.database.ref('test').child('yatay_gecis').once('value',data=>{

    //  var da=Object.keys(data.val());
     
    //  da.forEach(el=>{
    //    console.log()
    //    this.fireDb.database.ref('test/yatay_gecis').child(el).once('value',dat=>{
    //      console.log(dat.val());
    //    })
    //  })
    // })
 
  //kullanıcı datalar
  // console.log(this.userService.userData);
  

    this.fireDb.database.ref().child("fakulte/").on('value',data=>{
      // console.log(data.val());
      this.fakulteBolum=data.val();
      this.fakulteler=Object.keys(this.fakulteBolum);
     })

  }

  ionViewWillEnter()
  {
    this.menu.enable(false);
    if(this.userService.yatay==1)
    {
      this.class1="stepper-item completed"
      this.class2="stepper-item completed"
      this.class3="stepper-item completed"
      this.class4="stepper-item completed"

      this.content_class="none";
      this.content_class6="";
    }

  }




  fakulteBolum;

  class1="stepper-item active";
  class2="stepper-item";
  class3="stepper-item";
  class4="stepper-item";
  content_class="";
  content_class2="none";
  content_class3="none";
  content_class4="none";
  content_class5="none";
  content_class6="none";





   belgeler = [
     {belge_Ad:'Öğrenci belgesi',url:'',dosya_Ad:"",index:-1,isLoad:0},
     {belge_Ad:'ÖSYM sınav sonuç belgesi',dosya_Ad:"",url:'',index:-1,isLoad:0},
     {belge_Ad:'ÖSYM Yerleştirme belgesi',dosya_Ad:"",url:'',index:-1,isLoad:0},
     {belge_Ad:'Transkript',dosya_Ad:"",url:'',index:-1,isLoad:0},
     {belge_Ad:'Disiplin cezası  almadıklarını gösterir belge',dosya_Ad:"",url:'',index:-1,isLoad:0},
     {belge_Ad:'Öğretim planı/müfredatı ',dosya_Ad:"",url:'',index:-1,isLoad:0},
    ];
  
    fakulteler=[];
    bolumler=[];

 
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
   else
   {
     this.presentToast();
   }

    }
    else
    {
      this.presentToast();
    }
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

  async presentToastTercih() {
    const toast = await this.toastController.create({
      message: `Lütfen tercihlerinizi yapınız!`,
      duration: 1500,
      position: 'middle',
      cssClass: 'toast'
    });
    toast.present();
  }

  geri()
  {
    if(this.basvuruBitisi==1)
    {
      this.userService.yatay=1;
    }
    this.nav.back();
  }
  ionViewDidLeave()
  {
    if(this.basvuruBitisi==1)
    {
      this.userService.yatay=1;
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

     this.uploadData(fileReader.result,event.target.files[0].type,type,index,name);

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
  this.bolum="";
 this.fakulte=event.detail.value;
 this.disableBolum="false";
 this.bolumler=this.fakulteBolum[this.fakulte];

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

okulPuaniBilgisi(event)
{
  if(event.detail.value.length==3)
  {
  this.okulPuan=event.detail.value+'.';

  }
}
notOrtalamasiBilgisi(event)
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
else
{
  this.presentToastTercih();
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
        
          this.storage.refFromURL(this.belgeler[i].url).delete();  
          
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
uploadData(data,dataType,type,index,name)
{
 //dosya ismini degistirrrrrr 

 this.loadingControl=1;
  this.data=this.dataUrltoBlob(data,dataType);
  
 this.time=(new Date().toISOString().slice(0, 10)+" "+new Date().toTimeString().slice(0,5));
  console.log(this.time);
  //isim,data
 //  var upload= this.storage.upload("profilPic/"+`${this.data.email}_${this.time}.jpg`,this.uploadImg);
 var upload=this.storage.upload('yataygecis/'+`${type}/`+`${this.userService.userData.name}_`+`${this.time}`+type,this.data);
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


getBase64ImageFromURL(url) {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = error => {
      reject(error);
    };
    img.src = url;
  });
}

pdfTime;
async createPdf()
{
 
  
  this.pdfTime=(new Date().toISOString().slice(0, 10));
    
 
  if(this.tercihler.length==1)
  {
    var dd = {
      content: [
          {
          text: `${this.pdfTime}`,
          style: 'tarih'
        },
        
          {
          image: await this.getBase64ImageFromURL(
          "https://i.ibb.co/wrJYYZF/logo.png"
         ),
          width: 100,
          height: 100,
          style: 'kocaeli'
          
            },
            
        {
          text: 'Kocaeli Üniversitesi',
          style: 'header'
        },
        
        {
          text: 'Yatay Geçiş Başvurusu',
          style: 'subheader'
        },
        
        // {
  
        //   image: await this.getBase64ImageFromURL(
        //     "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
        //   ),
        //   width: 70,
        //   height: 90,
        //   style: 'vesikalık'
          
        //     },
            
            {
                text: 'Başvuran:' + `\t${this.userService.userData.name}`, 
          style: 'quote'
          
            },
            
            {
                text: 'T.C:' + `\t${this.userService.userData.tc}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Okulu:' + `\t${this.userService.userData.okul}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Tel No:' + `\t${this.userService.userData.tel}\n\n`, 
          style: 'quote'
          
            },
            
            {
                text: 'Başvurular:' + '\n\n\n', 
          style: 'quote'
          
            },
            
            {
                text: `${this.tercihler[0].fakulte}\t/\t` + `${this.tercihler[0].bolum}`, 
          style: 'basvuru'
          
            },
            {
                text: 'İmza:', 
               style: 'imza',
    
            },
            {
              style:'imzaAt',
              image:`${this.image}`,
              width: 100,
              height: 100,
            }
        
      ],
      
      
      styles: {
          kocaeli:
            {   
                alignment: 'center',
                 margin: [ 0, 0, 0, 10 ]
            },
            imza:
            {   
              fontSize: 18,
              alignment: 'right',
               margin: [ 0, 20, 100, 0 ]
            },
            imzaAt:
            {   
              alignment: 'right',
              margin: [ 0, 20, 35, 0 ]
            },
            tarih:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 0, -2 ]
            },
            vesikalık:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 10, 20 ]
            },
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        quote: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        basvuru: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        small: {
          fontSize: 8
        }
      }
      
    }
  }
  else if(this.tercihler.length==2)
  {
    var dd = {
      content: [
          {
          text: `${this.pdfTime}`,
          style: 'tarih'
        },
        
          {
          image: await this.getBase64ImageFromURL(
          "https://i.ibb.co/wrJYYZF/logo.png"
         ),
          width: 100,
          height: 100,
          style: 'kocaeli'
          
            },
            
        {
          text: 'Kocaeli Üniversitesi',
          style: 'header'
        },
        
        {
          text: 'Yatay Geçiş Başvurusu',
          style: 'subheader'
        },
        
        // {
  
        //   image: await this.getBase64ImageFromURL(
        //     "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
        //   ),
        //   width: 70,
        //   height: 90,
        //   style: 'vesikalık'
          
        //     },
            
            {
                text: 'Başvuran:' + `\t${this.userService.userData.name}`, 
          style: 'quote'
          
            },
            
            {
                text: 'T.C:' + `\t${this.userService.userData.tc}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Okulu:' + `\t${this.userService.userData.okul}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Tel No:' + `\t${this.userService.userData.tel}\n\n`, 
          style: 'quote'
          
            },
            
            {
                text: 'Başvurular:' + '\n\n\n', 
          style: 'quote'
          
            },
            
            {
                text: `${this.tercihler[0].fakulte}\t/\t` + `${this.tercihler[0].bolum}`, 
          style: 'basvuru'
          
            },
            {
              text: `${this.tercihler[1].fakulte}\t/\t` + `${this.tercihler[1].bolum}`, 
        style: 'basvuru'
        
          },
            {
                text: 'İmza:', 
               style: 'imza',
    
            },
            {
              style:'imzaAt',
              image:`${this.image}`,
              width: 100,
              height: 100,
            }
        
      ],
      
      
      styles: {
          kocaeli:
            {   
                alignment: 'center',
                 margin: [ 0, 0, 0, 10 ]
            },
            imza:
            {   
              fontSize: 18,
              alignment: 'right',
               margin: [ 0, 20, 100, 0 ]
            },
            imzaAt:
            {   
              alignment: 'right',
              margin: [ 0, 20, 35, 0 ]
            },
            tarih:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 0, -2 ]
            },
            vesikalık:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 10, 20 ]
            },
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        quote: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        basvuru: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        small: {
          fontSize: 8
        }
      }
      
    }

  }

  else if(this.tercihler.length==3)
  {
    var dd = {
      content: [
          {
          text: `${this.pdfTime}`,
          style: 'tarih'
        },
        
          {
          image: await this.getBase64ImageFromURL(
          "https://i.ibb.co/wrJYYZF/logo.png"
         ),
          width: 100,
          height: 100,
          style: 'kocaeli'
          
            },
            
        {
          text: 'Kocaeli Üniversitesi',
          style: 'header'
        },
        
        {
          text: 'Yatay Geçiş Başvurusu',
          style: 'subheader'
        },
        
        // {
  
        //   image: await this.getBase64ImageFromURL(
        //     "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
        //   ),
        //   width: 70,
        //   height: 90,
        //   style: 'vesikalık'
          
        //     },
            
            {
                text: 'Başvuran:' + `\t${this.userService.userData.name}`, 
          style: 'quote'
          
            },
            
            {
                text: 'T.C:' + `\t${this.userService.userData.tc}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Okulu:' + `\t${this.userService.userData.okul}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Tel No:' + `\t${this.userService.userData.tel}\n\n`, 
          style: 'quote'
          
            },
            
            {
                text: 'Başvurular:' + '\n\n\n', 
          style: 'quote'
          
            },
            
            {
                text: `${this.tercihler[0].fakulte}\t/\t` + `${this.tercihler[0].bolum}`, 
          style: 'basvuru'
          
            },
            {
              text: `${this.tercihler[1].fakulte}\t/\t` + `${this.tercihler[1].bolum}`, 
        style: 'basvuru'
        
          },
          {
            text: `${this.tercihler[2].fakulte}\t/\t` + `${this.tercihler[2].bolum}`, 
      style: 'basvuru'
      
        },
            {
                text: 'İmza:', 
               style: 'imza',
    
            },
            {
              style:'imzaAt',
              image:`${this.image}`,
              width: 100,
              height: 100,
            }
        
      ],
      
      
      styles: {
          kocaeli:
            {   
                alignment: 'center',
                 margin: [ 0, 0, 0, 10 ]
            },
            imza:
            {   
              fontSize: 18,
              alignment: 'right',
               margin: [ 0, 20, 100, 0 ]
            },
            imzaAt:
            {   
              alignment: 'right',
              margin: [ 0, 20, 35, 0 ]
            },
            tarih:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 0, -2 ]
            },
            vesikalık:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 10, 20 ]
            },
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        quote: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        basvuru: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        small: {
          fontSize: 8
        }
      }
      
    }

  }
  else if(this.tercihler.length==4)
  {
    var dd = {
      content: [
          {
          text: `${this.pdfTime}`,
          style: 'tarih'
        },
        
          {
          image: await this.getBase64ImageFromURL(
          "https://i.ibb.co/wrJYYZF/logo.png"
         ),
          width: 100,
          height: 100,
          style: 'kocaeli'
          
            },
            
        {
          text: 'Kocaeli Üniversitesi',
          style: 'header'
        },
        
        {
          text: 'Yatay Geçiş Başvurusu',
          style: 'subheader'
        },
        
        // {
  
        //   image: await this.getBase64ImageFromURL(
        //     "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
        //   ),
        //   width: 70,
        //   height: 90,
        //   style: 'vesikalık'
          
        //     },
            
            {
                text: 'Başvuran:' + `\t${this.userService.userData.name}`, 
          style: 'quote'
          
            },
            
            {
                text: 'T.C:' + `\t${this.userService.userData.tc}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Okulu:' + `\t${this.userService.userData.okul}`, 
          style: 'quote'
          
            },
            
            {
                text: 'Tel No:' + `\t${this.userService.userData.tel}\n\n`, 
          style: 'quote'
          
            },
            
            {
                text: 'Başvurular:' + '\n\n\n', 
          style: 'quote'
          
            },
            
            {
                text: `${this.tercihler[0].fakulte}\t/\t` + `${this.tercihler[0].bolum}`, 
          style: 'basvuru'
          
            },
            {
              text: `${this.tercihler[1].fakulte}\t/\t` + `${this.tercihler[1].bolum}`, 
        style: 'basvuru'
        
          },
          {
            text: `${this.tercihler[2].fakulte}\t/\t` + `${this.tercihler[2].bolum}`, 
      style: 'basvuru'
      
        },
        {
          text: `${this.tercihler[3].fakulte}\t/\t` + `${this.tercihler[3].bolum}`, 
    style: 'basvuru'
    
      },
            {
                text: 'İmza:', 
               style: 'imza',
    
            },
            {
              style:'imzaAt',
              image:`${this.image}`,
              width: 100,
              height: 100,
            }
        
      ],
      
      
      styles: {
          kocaeli:
            {   
                alignment: 'center',
                 margin: [ 0, 0, 0, 10 ]
            },
            imza:
            {   
              fontSize: 18,
              alignment: 'right',
               margin: [ 0, 20, 100, 0 ]
            },
            imzaAt:
            {   
              alignment: 'right',
              margin: [ 0, 20, 35, 0 ]
            },
            tarih:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 0, -2 ]
            },
            vesikalık:
            {   
                alignment: 'right',
                 margin: [ 0, 0, 10, 20 ]
            },
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        quote: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        basvuru: {
            fontSize: 16,
            margin: [ 0, 0, 0, 8 ]
        },
        small: {
          fontSize: 8
        }
      }
      
    }
  }

  var dokuman="Dökümanlar";

  var pdfObj;
  pdfObj=pdfMake.createPdf(dd);
  var date=new Date().toISOString().slice(0, 10);
  this.pdfName=this.userService.userData.tc+'_'+this.userService.userData.name+'_'+date+'yatay_gecis.pdf';
  pdfObj.getBase64(async (data)=>{
   try {
    const doc= await Filesystem.writeFile({
      path: this.pdfName,
      data: data,
      directory: Directory.Documents,
      recursive:true
    }).then((data)=>{
      this.pdfData=data.uri;
      this.readPdf();
    })
    // this.preview.preview(doc.uri);

  

   } catch (error) {

   }
  })
  

}


ppUrl;
blobImg;

pdfName;
basvuru_belgesi;

async  readPdf  ()  {
  const contents = await Filesystem.readFile({
    path: this.pdfName,
    directory: Directory.Documents,
  }).then((data)=>{
  //  var a=`data:application/pdf;base64,${contents}`;
  var c =this.b64toBlob(data.data,'application/pdf');
    var upload= this.storage.upload(`yataygecis/.pdf/${this.pdfName}`,c);
    upload.then(res=>{
      res.task.snapshot.ref.getDownloadURL().then(downloadableUrl=>{
       this.basvuru_belgesi=downloadableUrl;
       this.fireDb.database.ref('basvurular/'+`${this.userService.userData.uid}`+"/"+`${this.pushId}`).update({
        basvuru_belgesi:this.basvuru_belgesi,
      })


      })
    })

  });
};

b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}



pdfData;



async previewPdf()
{
  var a="Doküman";
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: `Başvuru belgesi <b>${a}</b> klasörüne indirilmiştir!`,
    buttons: [
 {
        text: 'Tamam',
        handler: () => {
         this.previewAnyFile.preview(this.pdfData);
        }
      }
    ]
  });

  await alert.present();
}

async previewPdf2()
{
  this.fireDb.database.ref('basvurular/'+this.userService.userData.uid).once('value',data=>{
    data.forEach(el=>{
      if(el.val().basvuruTipi=='yatay')
      {
        var data; 
        data=el.val().basvuru_belgesi;
        this.previewAnyFile.preview(data);

      }
    })
  })    


}


@ViewChild('canvas') canvas: any;
canvasElement: any;
lastX: number;
lastY: number;
currentColour: string = '#000';
brushSize: number = 4;

ngAfterViewInit()
{

      this.canvasElement = this.canvas.nativeElement;
      this.canvasElement.width = this.platform.width() + '';
      this.canvasElement.height = 200;
}

start(ev){

var canvasPosition = this.canvasElement.getBoundingClientRect();

this.lastX = ev.pageX - canvasPosition.x;
this.lastY = ev.pageY - canvasPosition.y;

}
move(ev){
let ctx = this.canvasElement.getContext('2d');

let currentX = ev.targetTouches[0].pageX;
let currentY = ev.targetTouches[0].pageY-230;


ctx.strokeStyle = this.currentColour;
ctx.lineWidth = this.brushSize;
ctx.lineJoin = "round";


ctx.beginPath();
ctx.moveTo(this.lastX, this.lastY);
ctx.lineTo(currentX, currentY);
ctx.closePath();
ctx.stroke();
this.lastX = currentX;
this.lastY = currentY;
}

clearCanvas(){
let ctx = this.canvasElement.getContext('2d');
ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
}

image;
async imzala()
{

    const alert = await this.alertController.create({
      cssClass: 'alert_css',
      header:   `İmzanızı onaylıyor musunuz?`,
      buttons: [
        {
          text: 'İptal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'tamam',
          handler: () => {
            var dataUrl = this.canvasElement.toDataURL();
            this.image=dataUrl;
            
            // Clear the current canvas
            let ctx = this.canvasElement.getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
             
            
            
            var belgeler=[];
            for (let index = 0; index < this.belgeler.length; index++) {
              belgeler.push({belgeAd:`${this.belgeler[index].belge_Ad}`,url:`${this.belgeler[index].url}`})          
            }
            
            //yatay_Gecis_ UId   pushId
            this.pushId=this.fireDb.createPushId();

            this.fireDb.database.ref('basvurular/'+`${this.userService.userData.uid}`+"/"+`${this.pushId}`).set({
              durum:'beklemede',
              ortalama:this.notOrt,
              okulPuani:this.okulPuan,
              belgeler:belgeler,
              tarih:this.time,
              uid:this.userService.userData.uid,
              basvuruTipi:'yatay',
              basvuru_belgesi:'',
              basvurular:this.tercihler,
              aciklama:'Beklemede'

            })
            

            //bakkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
            //  this.userService.yatay=1;

            this.basvuruBitisi=1;


            this.stepCounter++;
            
            this.content_class5="slide-out-left";
            this.content_class6="slide-in-right";
            setTimeout(() => {
              this.content_class5="none";
            }, 200);
            this.createPdf();
            
   
          }
        }
      ]
    });
  
    await alert.present();

}

basvuruBitisi=0;
pushId;


}
