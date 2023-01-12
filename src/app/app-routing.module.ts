import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './services/auth.service';
import { SignupComponent } from './components/signup/signup.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HaberlerComponent } from './components/haberler/haberler.component';
import { DetaylarComponent } from './components/detaylar/detaylar.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
   {path : 'home', component: HomeComponent },
   {path : 'login', component: LoginComponent },
   {path : 'signup', component: SignupComponent },
   {path : 'users', component: UsersComponent },
   {path : 'haberler', component: HaberlerComponent },
   {path : 'detaylar/:id', component: DetaylarComponent },
   {path : 'kategoriler', component: KategoriComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
