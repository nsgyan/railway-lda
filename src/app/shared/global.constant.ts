import { environment } from "../../environments/environment.prod";
export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'AddState': Globals.server + 'master/state',
        'AddDistrict': Globals.server + 'master/district',
        'AddBlock': Globals.server + 'master/block',
        'addLandCategory': Globals.server + 'master/landCategory',
        'addlandNature': Globals.server + 'master/landNature',
        'addlandType': Globals.server + 'master/landType',
        'addobjectionType': Globals.server + 'master/objectionType',
        'addVillage': Globals.server + 'master/village',
        'getState': Globals.server + 'master/state',
        'bank': Globals.server + 'master/bank',
        'getlandCategory': Globals.server + 'master/landCategory',
        'getlandNature': Globals.server + 'master/landNature',
        'getlandType': Globals.server + 'master/landType',
        'getobjectionType': Globals.server + 'master/objectionType',
        'getDistrict': Globals.server + 'master/district',
        'getBlock': Globals.server + 'master/block',
        'blocksList': Globals.server + 'master/blockList',
        'districtList': Globals.server + 'master/districtList',
        'village': Globals.server + 'master/village',
        'getVillageByBlock': Globals.server + 'master/getVillageByBlock',
        'getstateByID': Globals.server + 'master/getstateByID',
        'updateState': Globals.server + 'master/updateState',
        'getDistrictById': Globals.server + 'master/getDistrictById',
        'updatedistrict': Globals.server + 'master/updatedistrict',
        'getBlockById': Globals.server + 'master/getBlockById',
        'updateblock': Globals.server + 'master/updateblock',
        'getVillageByID': Globals.server + 'master/getVillageByID',
        'updateVillage': Globals.server + 'master/updateVillage',
        'addProject': Globals.server + 'project/add',
        'getProject': Globals.server + 'project',
        'addBeneficiary': Globals.server + 'beneficiary/add',
        "login":Globals.server+'user/login'
    };
}
