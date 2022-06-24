import { HttpClient, HttpParams, HttpEvent, HttpRequest, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Globals } from "./global.constant";
import { LocalstorageService } from "./localstorage.service";




@Injectable({
  providedIn: 'root'
})
export class HttpsService {
  constructor(private httpService: HttpClient,
    private localStroage: LocalstorageService) { }

    AddState(formData: any) {
    return this.httpService.post(Globals.route.AddState, formData);
  }
  AddDistrict(formData: any) {
    return this.httpService.post(Globals.route.AddDistrict, formData);
  }


  getState() {
    return this.httpService.get(Globals.route.getState);
  }

}
