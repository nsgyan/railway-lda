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
  addProject(formData: any) {
    return this.httpService.post(Globals.route.addProject, formData);
  }

  AddDistrict(formData: any) {
    return this.httpService.post(Globals.route.AddDistrict, formData);
  }
  addLandCategory(formData: any) {
    return this.httpService.post(Globals.route.addLandCategory, formData);
  }
  addlandNature(formData: any) {
    return this.httpService.post(Globals.route.addlandNature, formData);
  }

  addBeneficiary(formData: any) {
    return this.httpService.post(Globals.route.addBeneficiary, formData);
  }
  AddBlock(formData: any) {
    return this.httpService.post(Globals.route.AddBlock, formData);
  }
  addVillage(formData: any) {
    return this.httpService.post(Globals.route.addVillage, formData);
  }
  updateState(formData: any) {
    return this.httpService.patch(Globals.route.updateState, formData);
  }
  updatedistrict(formData: any) {
    return this.httpService.patch(Globals.route.updatedistrict, formData);
  }
  updateblock(formData: any) {
    return this.httpService.patch(Globals.route.updateblock, formData);
  }
  updateVillage(formData: any) {
    return this.httpService.patch(Globals.route.updateVillage, formData);
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
  getlandNature() {
    return this.httpService.get(Globals.route.getlandNature);
  }
  getlandCategory() {
    return this.httpService.get(Globals.route.getlandCategory);
  }
  getProject() {
    return this.httpService.get(Globals.route.getProject);
  }

  getVillageByBlock(block:any) {
    let queryParams= new HttpParams();
    queryParams=queryParams.append("block",block)
    return this.httpService.get(Globals.route.getVillageByBlock,{
      params:queryParams
    });
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

  getstateByID(id:any){
    return this.httpService.get(`${Globals.route.getstateByID}/${id}`)
  }

  getDistrictById(id:any){
    return this.httpService.get(`${Globals.route.getDistrictById}/${id}`)
  }

  getBlockById(id:any){
    return this.httpService.get(`${Globals.route.getBlockById}/${id}`)
  }

  getVillageByID(id:any){
    return this.httpService.get(`${Globals.route.getVillageByID}/${id}`)
  }
}
