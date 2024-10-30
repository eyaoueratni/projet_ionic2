import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule) ,
  canMatch: [authGuard] 
  },
  {
    path: 'login',
   
    children: [
      {
        path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
      },
      {
        path:'signup',
        loadChildren: () => import('./pages/login/signup/signup.module').then( m => m.SignupPageModule),
      }
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
