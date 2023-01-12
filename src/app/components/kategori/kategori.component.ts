import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Categories } from 'src/app/models/Categories';
import { UyeModel } from 'src/app/models/uyeModel';
import { Result } from 'src/app/models/Result';
import { FirebaseService } from 'src/app/services/FirebaseService.service';
import { MytoastService } from 'src/app/services/toastService.service';
import { HotToastService } from '@ngneat/hot-toast';
@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  kategoriler!: Categories[];
  modal!: Modal;
  modalBaslik: string = "";
  secKat!: Categories;
  result: Result = new Result();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    katId: new FormControl(),
    kategoriYazanId: new FormControl(),
    kategoriAdi: new FormControl(),
    kategoriKayitTarihi: new FormControl(),
    kategoriDuzenlemeTarihi: new FormControl(),
  });

  constructor(
    public fbs: FirebaseService,
    public toast: MytoastService,
    public htoast: HotToastService
  ) { }

  ngOnInit() {
    this.KategorileriListele();
  }


  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kategori Ekle";
    this.modal.show();
  }
  Duzenle(kat: Categories, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: Categories, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }


  KategorileriListele() {
    this.fbs.KategoriListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }

  KategoriSil() {
    this.fbs.KategoriSil(this.secKat).then((d) => {
      this.result.process = true;
      this.result.msg = 'Kategori Silindi';
      this.toast.ToastUygula(this.result);
      this.KategorileriListele();
      this.modal.toggle();
    });
  }
  CategoriesEkleDuzenle() {
    var kategori: Categories = this.frm.value
    var tarih = new Date();
    if (!kategori.katId) {
      var filtre = this.kategoriler.filter(s => s.kategoriAdi == kategori.kategoriAdi);
      if (filtre.length > 0) {
        this.result.process = false;
        this.result.msg = "Girilen Kategori Kayıtlıdır!";
        this.toast.ToastUygula(this.result);
      } else {
        kategori.kategoriDuzenlemeTarihi = tarih.getTime().toString();
        kategori.kategoriKayitTarihi = tarih.getTime().toString();
        this.fbs.KategoriEkle(kategori).then(d => {
          this.result.process = true;
          this.result.msg = "Kategori Eklendi";
          this.toast.ToastUygula(this.result);
          this.KategorileriListele();
          this.modal.toggle();
        });
      }
    } else {
      kategori.kategoriDuzenlemeTarihi = tarih.getTime().toString();
      this.fbs.KategoriDuzenle(kategori).then(d => {
        this.result.process = true;
        this.result.msg = "Kategori Düzenlendi";
        this.toast.ToastUygula(this.result);
        this.KategorileriListele();
        this.modal.toggle();
      });
    }

  }
}


