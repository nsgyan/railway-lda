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
  AddBlock(formData: any) {
    return this.httpService.post(Globals.route.AddBlock, formData);
  }
  addVillage(formData: any) {
    return this.httpService.post(Globals.route.addVillage, formData);
  }


  blocksList() {
    return this.httpService.get(Globals.route.blocksList);
  }
  districtList() {
    return this.httpService.get(Globals.route.districtList);
  }
  village() {
    return this.httpService.get(Globals.route.village);
  }
  getState() {
    return this.httpService.get(Globals.route.getState);
  }

  getDistrict(state:any) {
    let queryParams= new HttpParams();
    queryParams=queryParams.append("state",state)
    return this.httpService.get(Globals.route.getDistrict,{
      params:queryParams
    });
  }
  getBlock(state:any,district:any) {
    let queryParams= new HttpParams();
    queryParams=queryParams.append("state",state)
    queryParams=queryParams.append("district",district)
    return this.httpService.get(Globals.route.getBlock,{
      params:queryParams
    });
  }
}
