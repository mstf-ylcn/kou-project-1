import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'duyurular',
    loadChildren: () => import('./pages/duyurular/duyurular.module').then( m => m.DuyurularPageModule)
  },
  {
    path: 'progresive',
    loadChildren: () => import('./pages/progresive/progresive.module').then( m => m.ProgresivePageModule)
  },
  {
    path: 'cam',
    loadChildren: () => import('./pages/cam/cam.module').then( m => m.CamPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'yatay-gecis',
    loadChildren: () => import('./pages/yatay-gecis/yatay-gecis.module').then( m => m.YatayGecisPageModule)
  },
  {
    path: 'basvurularim',
    loadChildren: () => import('./pages/basvurularim/basvurularim.module').then( m => m.BasvurularimPageModule)
  },
  {
    path: 'modal-basvuru',
    loadChildren: () => import('./pages/modal-basvuru/modal-basvuru.module').then( m => m.ModalBasvuruPageModule)
  },
  {
    path: 'yaz-okulu',
    loadChildren: () => import('./pages/yaz-okulu/yaz-okulu.module').then( m => m.YazOkuluPageModule)
  },
  {
    path: 'intibak',
    loadChildren: () => import('./pages/intibak/intibak.module').then( m => m.IntibakPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'cap',
    loadChildren: () => import('./pages/cap/cap.module').then( m => m.CapPageModule)
  },
  {
    path: 'dikey',
    loadChildren: () => import('./pages/dikey/dikey.module').then( m => m.DikeyPageModule)
  },
  {
    path: 'ayarlar',
    loadChildren: () => import('./pages/ayarlar/ayarlar.module').then( m => m.AyarlarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
