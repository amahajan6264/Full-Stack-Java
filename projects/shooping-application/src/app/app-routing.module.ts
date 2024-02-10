import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CareersComponent } from './careers/careers.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  {path :'',component:HomeComponent},
  {path :'signin',component:LoginComponent},
  {path :'careers',component:CareersComponent},
  {path :'aboutas',component:AboutusComponent},
  {path :'signup',component:SignupComponent},
  {path :'material',component:MaterialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
