import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Result } from 'src/app/models/Result'
import { UyeModel } from 'src/app/models/uyeModel';
import { MytoastService } from '../../services/toastService.service'
import { FirebaseService } from 'src/app/services/FirebaseService.service'
import * as bootstrap from 'bootstrap'
import { HotToastService } from '@ngneat/hot-toast';
import { identity, switchMap } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  logOff() {
    localStorage.clear();
    location.href = "/login";
  }

  uye = this.fbs.AktifUyeBilgi;
  modal!: Modal;
  modalBaslik: string = '';
  secUye!: UyeModel;
  uyeler!: UyeModel[];
  sonuc: Result = new Result();
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    displayName: new FormControl(),
    kullaniciSoyad: new FormControl(),
    kullaniciKadi: new FormControl(),
    kullaniciEmail: new FormControl(),
    kullaniciSifre: new FormControl(),
    kullaniciAdminMi: new FormControl(),
    kullaniciKayitTarihi: new FormControl(),
    kullaniciKayitDuzTarihi: new FormControl(),
    grupId: new FormControl()

  })
  constructor(
    public fbs: FirebaseService, 
    public toast : MytoastService,
    public htoast : HotToastService
    ) { }

  ngOnInit() {
    this.UyeleriListele();
    this.fbs.AktifUyeBilgi
    .subscribe((uye) => {
      this.frm.patchValue({ ...uye });
    });
  }
  
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ kullaniciAdminMi: "0" });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: UyeModel, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = 'Üye Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: UyeModel, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = 'Üye Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  UyeleriListele() {
    this.fbs.UyeListele().subscribe((d) => {
      this.uyeler = d;
    });
  }
  Kaydet() {
    this.fbs
      .UyeEkle(this.frm.value)
      .pipe(
        this.htoast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: 'Hata Oluştu',
        })
      )
      .subscribe();
  }
  
  UyeEkleDuzenle() {
    var uye: UyeModel = this.frm.value
    var tarih = new Date();
    if (!uye.uid) {
        uye.kullaniciKayitTarihi = tarih.getTime().toString();
        uye.kullaniciKayitDuzTarihi = tarih.getTime().toString();
        this.fbs.UyeEkle(uye).subscribe(d => {
          this.sonuc.process = true;
          this.sonuc.msg = "Uye Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.UyeleriListele();
          this.modal.toggle();
        });
    } else {
      uye.kullaniciKayitDuzTarihi = tarih.getTime().toString();
      this.fbs.UyeDuzenle(uye).then(d => {
        this.sonuc.process = true;
        this.sonuc.msg = "Üye Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.UyeleriListele();
        this.modal.toggle();
      });
    }

  }
  UyeSil() {
    this.fbs.UyeSil(this.secUye).subscribe(d => {
      this.sonuc.process = true;
      this.sonuc.msg = "Üye Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.UyeleriListele();
      this.modal.toggle();
    });
  }
  
}
