import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthguardService } from './shared/helper/authguard.service';

const routes: Routes = [
  {
    path: '', redirectTo: 'auth/login', pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthguardService],
    loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
  }, {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
