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


  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const request = new HttpRequest(
      'POST',
      Globals.route.upload,
      formData,
      {
        reportProgress: false,
        responseType: 'text',
      }
    );

    return this.httpService.request(request);
  }
  getSurvey(){
    return this.httpService.get(Globals.route.getSurvey)
  }
  addSurvey(formData:any){
    return this.httpService.post(Globals.route.survey,formData)
  }
    login(formData:any){
      return this.httpService.post(Globals.route.login,formData)
    }

    AddState(formData: any) {
    return this.httpService.post(Globals.route.AddState, formData);
  }
  addBank(formData: any) {
    return this.httpService.post(Globals.route.bank, formData);
  }
  getBank() {
    return this.httpService.get(Globals.route.bank);
  }
  updateBank(formData:any) {
    return this.httpService.patch(Globals.route.bank,formData);
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
  updateLandCategory(formData: any) {
    return this.httpService.patch(Globals.route.addLandCategory, formData);
  }
  addlandType(formData: any) {
    return this.httpService.post(Globals.route.addlandType, formData);
  }
  updatelandType(formData: any) {
    return this.httpService.patch(Globals.route.addlandType, formData);
  }
  addobjectionType(formData: any) {
    return this.httpService.post(Globals.route.addobjectionType, formData);
  }
  updateobjectionType(formData: any) {
    return this.httpService.patch(Globals.route.addobjectionType, formData);
  }
  addlandNature(formData: any) {
    return this.httpService.post(Globals.route.addlandNature, formData);
  }
  updatelandNature(formData: any) {
    return this.httpService.patch(Globals.route.addlandNature, formData);
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
  getlandType() {
    return this.httpService.get(Globals.route.getlandType);
  }
  getobjectionType() {
    return this.httpService.get(Globals.route.getobjectionType);
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
  getSurveyByID(id:any){
    let queryParams= new HttpParams();
    queryParams=queryParams.append('id',id)
    return this.httpService.get(Globals.route.getSurveyByID,{
      params:queryParams
    })
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
