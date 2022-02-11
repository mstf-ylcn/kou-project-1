import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { MenuController } from '@ionic/angular';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import{userService} from '../userService'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menu:MenuController,private router:Router,
    private previewAnyFile:PreviewAnyFile,
    private auth:AngularFireAuth,
    private fireDb:AngularFireDatabase,
    private storage:AngularFireStorage,
    private userService:userService) { 


      
    this.fireDb.database.ref('basvurular/'+`${this.userService.userData.uid}`).once('value',data=>{
      data.forEach(el=>{
        console.log(el.val());
        if(el.val().basvuruTipi=="yatay" && el.val().durum=="beklemede" || el.val().durum=="onaylandi")
        {
          this.userService.yatay=1;
        }
        else if(el.val().basvuruTipi=="dikey" && el.val().durum=="beklemede" || el.val().durum=="onaylandi")
        {
          this.userService.dikey=1;
        }
        else if(el.val().basvuruTipi=="yaz" && el.val().durum=="beklemede" || el.val().durum=="onaylandi")
        {
          this.userService.yaz=1;

        }
        else if(el.val().basvuruTipi=="cap" && el.val().durum=="beklemede" || el.val().durum=="onaylandi")
        {
          this.userService.cap=1;

        }
        else if(el.val().basvuruTipi=="intibak" && el.val().durum=="beklemede" || el.val().durum=="onaylandi")
        {
          this.userService.intibak=1;

        }

      })
    })
     
   
      this.fireDb.database.ref().child("kilavuzlar/").child(`/yatay_gecis`).on('value',data=>{
        this.yatay_gecis_kilavuz=data.val();
      })
      this.fireDb.database.ref().child("kilavuzlar/").child(`/cap`).on('value',data=>{
        this.cap_kilavuz=data.val();
      })
      this.fireDb.database.ref().child("kilavuzlar/").child(`/yaz`).on('value',data=>{
        this.yaz_kilavuz=data.val();
      })
      this.fireDb.database.ref().child("kilavuzlar/").child(`/dikey_gecis`).on('value',data=>{
        this.dikey_gecis_kilavuz=data.val();
      })

    }
 
    yatay_gecis_kilavuz;
    dikey_gecis_kilavuz;
    yaz_kilavuz;
    cap_kilavuz;



  ngOnInit() {
    this.menu.enable(true);
  
    setTimeout(() => {
      this.menu.open();
      
    }, 700);

    setTimeout(() => {
      this.menu.close();
    }, 1400);

  }

  ionViewWillEnter()
{
  this.menu.enable(true);

}

  yatayGecis()
  {
  this.router.navigateByUrl('/yatay-gecis')
  }
  yazOkulu()
  {
  this.router.navigateByUrl('/yaz-okulu')
  }
  intibak()
  {
    this.router.navigateByUrl('/intibak')

  }
  cap()
  {
    this.router.navigateByUrl('/cap')

  }
  dikeyGecis()
  {
    this.router.navigateByUrl('/dikey')
  }
  yatayGecisKilavuz()
  {
    this.previewAnyFile.preview(this.yatay_gecis_kilavuz);
  }

  dikeyGecisKilavuz()
  {
    this.previewAnyFile.preview(this.dikey_gecis_kilavuz);
  }

  yazKilavuz()
  {
    this.previewAnyFile.preview(this.yaz_kilavuz);
  }

  
  capKilavuz()
  {
    this.previewAnyFile.preview(this.cap_kilavuz);
  }

}
