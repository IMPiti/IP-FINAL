import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';

import { FirebaseService } from '../../services/FirebaseService.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  constructor(
    public fbs: FirebaseService,
    public htoast: HotToastService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  UyeOl(
    displayName: string,
    kullaniciSoyad: string,
    kullaniciKadi: string,
    kullaniciEmail: string,
    kullaniciSifre: string,
    
  ) {
    let tarih = new Date()
    let kullaniciKayitTarihi = tarih;
    let kullaniciKayitDuzTarihi = tarih;
    let kullaniciAdminMi = "0";
    this.fbs
      .KayitOl(kullaniciEmail, kullaniciSifre)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.fbs.UyeEkle({
            uid: uid,
            kullaniciEmail,
            kullaniciSifre,
            displayName: displayName,
            kullaniciSoyad: kullaniciSoyad,
            kullaniciKadi: kullaniciKadi,
            kullaniciAdminMi,
            kullaniciKayitTarihi : kullaniciKayitTarihi.toLocaleDateString(),
            kullaniciKayitDuzTarihi : kullaniciKayitDuzTarihi.toLocaleDateString()
          })
        ),
        this.htoast.observe({
          success: 'Tebrikler Kayıt Yapıldı',
          loading: 'Kayıt Yapılıyor...',
          error: ({ message }) => `${message}`,
        })
      )
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

}
