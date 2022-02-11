
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';

pdfMake.vfs=pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-cam',
  templateUrl: './cam.page.html',
  styleUrls: ['./cam.page.scss'],
})
export class CamPage implements AfterViewInit {


  
  constructor( private sanitizer:DomSanitizer,public platform: Platform,
    private storage:AngularFireStorage,private preview:PreviewAnyFile) { }

  ngOnInit() {
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
  
   time;
 async createPdf()
  {

    
    this.time=(new Date().toISOString().slice(0, 10));
      

    var dd = {
      content: [
          {
          text: `${this.time}`,
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
                text: 'Başvuran:' + '\tAslı Enver', 
          style: 'quote'
          
            },
            
            {
                text: 'T.C:' + '\t11111111111', 
          style: 'quote'
          
            },
            
            {
                text: 'Okulu:' + '\tKocaeli Üniversitesi', 
          style: 'quote'
          
            },
            
            {
                text: 'Tel No:' + '\t0543 343 12 43\n\n', 
          style: 'quote'
          
            },
            
            {
                text: 'Başvurular:' + '\n\n\n', 
          style: 'quote'
          
            },
            
            {
                text: 'Teknoloji Fakültesi\t/\t' + 'Bilişim Sistemleri Mühendisliği', 
          style: 'basvuru'
          
            },
            {
                text: 'Hukuk Fakültesi\t/\t' + 'Hukuk', 
          style: 'basvuru'
          
            },
            {
                text: 'Mühendislik Fakültesi \t/\t' + 'Bilgisayar Mühendisliği', 
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

    var pdfObj;
    pdfObj=pdfMake.createPdf(dd);

    pdfObj.getBase64(async (data)=>{
     try {
      const bekle= await Filesystem.writeFile({
        path: 'aaa.pdf',
        data: data,
        directory: Directory.Documents,
        recursive:true
      })
      this.preview.preview(bekle.uri);
       alert("oldu");
     } catch (error) {
      alert("hata");

     }
    })

    

  
  
  // window.open(a,'_blank','location=no');
//  var c=this.dataUrltoBlobPdf(a);
 

  
  }


  ppUrl;
  blobImg;






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
  let currentY = ev.targetTouches[0].pageY-60;


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
save()
{
  var dataUrl = this.canvasElement.toDataURL();
  this.image=dataUrl;

  // Clear the current canvas
  let ctx = this.canvasElement.getContext('2d');
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   
   
  this.createPdf();   


}

}
