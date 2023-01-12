import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UyeModel } from '../models/uyeModel';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { Categories } from '../models/Categories';
import { News } from '../models/news';
import { DetayYorum } from '../models/detayYorum';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnInit{
  aktifUye = authState(this.auth);
  uye = this.AktifUyeBilgi
  uyeAdmin: string = "";
 


  public apiURL = "http://localhost:3000/";
  
constructor(
  public http: HttpClient,
  public fs: Firestore,
  public auth: Auth,
  public router : Router,
  public storage: Storage
) { }
  ngOnInit(): void {
    this.uye.subscribe((d) => {
      this.uyeAdmin = d?.kullaniciAdminMi as string
    })  }

KayitOl(kullaniciEmail: string, kullaniciSifre: string) {
  return from(createUserWithEmailAndPassword(this.auth, kullaniciEmail, kullaniciSifre));
}
OturumAc(kullaniciEmail: string, kullaniciSifre: string) {
  return from(signInWithEmailAndPassword(this.auth, kullaniciEmail, kullaniciSifre));
}
OturumKapat() {
  return from(this.auth.signOut());
}

// GoogleAuth() {
//   return this.AuthLogin(new auth.GoogleAuthProvider()).then(res: any) => {
//     this.router.navigate(['home']);
//   }
// }
get AktifUyeBilgi() {
  return this.aktifUye.pipe(
    switchMap((user) => {
      if (!user?.uid) {
        return of(null);
      }
      const ref = doc(this.fs, 'Users', user?.uid);
      return docData(ref) as Observable<UyeModel>;
    })
  );
}
 // Member
UyeListele() {
  var ref = collection(this.fs, "Users");
  return collectionData(ref, { idField: 'uid' }) as Observable<UyeModel[]>;
}
UyeById(uid: string) {
  const ref = doc(this.fs, "Users/"+ uid)
  return from(docData(ref)) as Observable<UyeModel>
}
UyeEkle(uye: UyeModel) {
  var ref = doc(this.fs, 'Users', uye.uid);
  return from(setDoc(ref, uye))
}
UyeDuzenle(uye: UyeModel) {
  var ref = doc(this.fs, 'Users/' + uye.uid);
  return updateDoc(ref, { ...uye });
}
UyeSil(uye: UyeModel) {
  var ref = doc(this.fs, "Users", uye.uid);
  return from(deleteDoc(ref));
}

// kategori 

KategoriListele() {
  var ref = collection(this.fs, "Categories")
  return collectionData(ref, {idField: 'katId' }) as Observable<Categories[]>
}
KategoriById(id: string) {
  const ref = doc(this.fs, "Categories/"+ id)
  return docData(ref) as Observable<Categories>
}
KategoriEkle(kat: Categories) {
  var ref = collection(this.fs, "Categories")
  return addDoc(ref, kat)
}
KategoriDuzenle(kat: Categories) {
  var ref = doc(this.fs, "Categories/"+ kat.katId)
  return updateDoc(ref, { ...kat })
}
KategoriSil(kat: Categories) {
  var ref = doc(this.fs, "Categories/"+ kat.katId)
  return deleteDoc(ref)
}

// newsYukleyenID(id:number) {
//   return this.http.get<News[]>(this.apiURL + "news?newsYukleyen=" + id);
// }

// HABER

HaberListele() {
  var ref = collection(this.fs, "Categories/"+"/News")
  return collectionData(ref, {idField: 'haberId'}) as Observable<News[]>
}
HaberListeleByKatId(katId: string) {
  var ref = collection(this.fs, "Categories/"+katId+"/News")
  return collectionData(ref, {idField:'haberId'}) as Observable<News[]>
}
HaberById(id: string, katId:string) {
  const ref = doc(this.fs, "Categories/"+ katId + "/News/"+ id)
  return docData(ref) as Observable<News> 
}
HaberEkle(haber: News) {
  var ref = collection(this.fs, "Categories/"+ haber.categoryId+ "/News")
  return addDoc(ref, haber)
}
HaberDuzenle(haber: News) {
  var ref = doc(this.fs, "Categories/"+ haber.categoryId+ "/News/"+ haber.haberId)
  return updateDoc(ref, { ...haber })
}
HaberSil(haber: News) {
  var ref = doc(this.fs, "Categories/"+ haber.categoryId+"/News/"+ haber.haberId)
  return deleteDoc(ref)
}


uploadImage(image: File, path: string): Observable<string> {
  const storageRef = ref(this.storage, path);
  const uploadTask = from(uploadBytes(storageRef, image));
  return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
}

// CategoriesByKatId(katId: number) {
//   return this.http.get<Categories[]>(this.apiURL + "categories/" + katId + "/news");
// }
// CategoriesById(id: number) {
//   return this.http.get<Categories>(this.apiURL +"categories/" + id );
// }

YorumListele() {
  var ref = collection(this.fs, "Categories/"+"News/"+"/Comments")
  return collectionData(ref, {idField: 'yorumId'}) as Observable<DetayYorum[]>
}

YorumEkle(yorum: DetayYorum, haberId: string, katId:string) {
  var ref = collection(this.fs, "Categories/"+ katId + "/News/"+ haberId + "/Comments" + yorum.yorumId)
  return addDoc(ref, { ...yorum });
}
YorumDuzenle(yorum: DetayYorum, haberId: string, katId:string) {
  var ref = doc(this.fs, "Categories/"+ katId + "/News/"+ haberId + "/Comments" + yorum.yorumId);
  return updateDoc(ref, { ...yorum });
}

YorumListeleByHaberId(katId: string, haberId: string){
  var ref = collection(this.fs, "Categories/"+ katId + "/News/"+ haberId + "/Comments")
  return collectionData(ref, {idField: 'yorumId'}) as Observable<DetayYorum[]>
}
YorumSil(yorum: DetayYorum, haberId: string, katId:string) {
  var ref = doc(this.fs, "Categories/"+ katId + "/News/"+ haberId + "/Comments" + yorum.yorumId);
  return deleteDoc(ref);
}
}