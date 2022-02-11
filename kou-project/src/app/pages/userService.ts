import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class userService {

   constructor(){
   }
   
   userData;
   
   componentControl=0;

   yatay=0;
   dikey=0;
   cap=0;
   yaz=0;
   intibak=0;

   basvuruTipi=-1;
   basvuruTarih;
   basvuruModal=[];
   basvuruDurum;
   basvuruAciklama;
   basvurularim=[];
   pw;
}