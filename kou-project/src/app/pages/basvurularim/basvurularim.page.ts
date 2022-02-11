import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {ModalBasvuruPage} from '../modal-basvuru/modal-basvuru.page'
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { userService } from '../userService';


@Component({
  selector: 'app-basvurularim',
  templateUrl: './basvurularim.page.html',
  styleUrls: ['./basvurularim.page.scss'],
})
export class BasvurularimPage implements OnInit {

  constructor(private modalCtrl:ModalController,
    private nav:NavController,
    private afAuth:AngularFireAuth,
    private fireDb:AngularFireDatabase,
    public userService:userService) {
      this.userService.basvurularim=[];

     this.fireDb.database.ref('basvurular').child(this.userService.userData.uid).once('value',data=>{
       data.forEach(el=>{
         console.log(el.val());
         this.userService.basvurularim.push(el.val());
       })
      // console.log(data.val());
      console.log(this.userService.basvurularim);
     })     

     }

     basvurular=[];

  ngOnInit() {
  }
  async detail(tip,tarih,basvurular,basvuruDurum,aciklama){
    const detail = {
      component: ModalBasvuruPage,
      cssClass:'detail-modal',
      swipeToClose: true
    };
   
    this.userService.basvuruTarih=tarih;
    this.userService.basvuruModal=basvurular;
    this.userService.basvuruDurum=basvuruDurum;
    this.userService.basvuruAciklama=aciklama;
   if(tip=="yatay")
   {
     this.userService.basvuruTipi=0;
   }
   else if(tip=="yaz")
   {
    this.userService.basvuruTipi=1;

   } 
    else if(tip=="dikey")
   {
    this.userService.basvuruTipi=2;

   }
   else if(tip=="cap")
   {
    this.userService.basvuruTipi=3;

   }
   else if(tip=="intibak")
   {
    this.userService.basvuruTipi=4;

   }

    const modal = await this.modalCtrl.create(detail);
    await modal.present();
  }
  back()
  {
    this.nav.back();
  }
}
