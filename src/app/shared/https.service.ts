
import { HttpClient, HttpEvent, HttpRequest, HttpParams } from "@angular/common/http";
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

  checkAadhar(formData: any) {
    return this.httpService.post(Globals.route.adharcheck, formData)
  }

  forgotPassword(formData: any) {
    return this.httpService.post(Globals.route.forgotPassword, formData)
  }


  checkPan(formData: any) {
    return this.httpService.post(Globals.route.pancheck, formData)
  }

  dlcheck(formData: any) {
    return this.httpService.post(Globals.route.dlcheck, formData)
  }

  ration(formData: any) {
    return this.httpService.post(Globals.route.ration, formData)
  }
  addPaymentdemand(formData: any) {
    return this.httpService.post(Globals.route.addPaymentdemand, formData)
  }

  getCountBeneficiary(formData: any) {
    return this.httpService.post(Globals.route.getCountBeneficiary, formData);
  }
  getsurveyByProject(formData: any) {
    return this.httpService.post(Globals.route.getsurveyByProject, formData);
  }
  getBeneficiary(){
    return this.httpService.get(Globals.route.getBeneficiary)
  }
  getPaymentdemand(){
    return this.httpService.get(Globals.route.getPaymentdemand)
  }
  getPaymentdemandByID(id:any){
    return this.httpService.get(`${Globals.route.getPaymentdemand}/${id}`)
  }
  getBeneficiaryByID(id:any){
    return this.httpService.get(`${Globals.route.getBeneficiary}/${id}`)
  }
  getProjectByID(id:any){
    return this.httpService.get(`${Globals.route.getProjectByID}/${id}`)
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
  getBeneficiaryByStateDistrict(formData: any) {
    return this.httpService.post(Globals.route.getBeneficiaryByStateDistrict, formData);
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
  checkEmail(formData: any) {
    return this.httpService.post(Globals.route.checkEmail, formData);
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
  changePassword(formData: any,token:any) {
    return this.httpService.patch(`${Globals.route.changePassword}/${token}`, formData);
  }
  updatePaymentdemand(formData: any,id:any) {
    return this.httpService.patch(`${Globals.route.updatePaymentdemand}/${id}`, formData);
  }
  updateBeneficiary(formData: any,id:any) {
    return this.httpService.patch(`${Globals.route.updateBeneficiary}/${id}`, formData);
  }
  updatesurvey(formData: any,id:any) {
    return this.httpService.patch(`${Globals.route.updatesurvey}/${id}`, formData);
  }
  updateProject(formData: any,id:any) {
    return this.httpService.patch(`${Globals.route.updateProject}/${id}`, formData);
  }
  delPaymentdemand(id: any) {
    return this.httpService.delete(`${Globals.route.delPaymentdemand}/${id}`);
  }
  delsurvey(_id: any) {
    return this.httpService.delete(`${Globals.route.delsurvey}/${_id}`);
  }
  deletedProject(id: any) {
    return this.httpService.delete(`${Globals.route.deletedProject}/${id}`);
  }
  delBeneficiary(id: any) {
    return this.httpService.delete(`${Globals.route.delBeneficiary}/${id}`);
  }
  districtdelete(id: any) {
    return this.httpService.delete(`${Globals.route.districtdelete}/${id}`);
  }
  statedelete(_id: any) {
    return this.httpService.delete(`${Globals.route.statedelete}/${_id}`);
  }
  landdelete(id: any) {
    return this.httpService.delete(`${Globals.route.landdelete}/${id}`);
  }
  landnaturedelete(id: any) {
    return this.httpService.delete(`${Globals.route.landnaturedelete}/${id}`);
  }
  bankdelete(_id: any) {
    return this.httpService.delete(`${Globals.route.bankdelete}/${_id}`);
  }
  objectiontypedelete(id: any) {
    return this.httpService.delete(`${Globals.route.objectiontypedelete}/${id}`);
  }
  landtypedelete(id: any) {
    return this.httpService.delete(`${Globals.route.landtypedelete}/${id}`);
  }
  blockdelete(id: any) {
    return this.httpService.delete(`${Globals.route.blockdelete}/${id}`);
  }
  villagedelete(id: any) {
    return this.httpService.delete(`${Globals.route.villagedelete}/${id}`);
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

    return this.httpService.get(`${Globals.route.getSurveyByID}/${id}`)
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
