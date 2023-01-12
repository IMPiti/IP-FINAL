import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';

import { FormsModule } from '@angular/forms';


import { AuthGuard } from './services/auth.service';


import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { FirebaseService } from './services/FirebaseService.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { HotToastModule } from '@ngneat/hot-toast';
import { ReactiveFormsModule } from '@angular/forms';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { HaberlerComponent } from './components/haberler/haberler.component';
import { DetaylarComponent } from './components/detaylar/detaylar.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    KategoriComponent,
    UsersComponent,
    HaberlerComponent,
    DetaylarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    HotToastModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,

  ],
  providers: [FirebaseService, HotToastService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
