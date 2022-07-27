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
        'getProject': Globals.server + 'project/',
        'totalProject': Globals.server + 'project/total',
        'getProjectByID': Globals.server + 'project/get',
        'updateProject': Globals.server + 'project/update',
        'deletedProject': Globals.server + 'project/deleted',
        'getsurveyByProject': Globals.server + 'project/getsurvey',
        'ongoingProject': Globals.server + 'project/ongoing',
        'addBeneficiary': Globals.server + 'beneficiary/add',
        'getBeneficiary': Globals.server + 'beneficiary/get',
        'countBeneficiary': Globals.server + 'beneficiary/count',
        'delBeneficiary': Globals.server + 'beneficiary/del',
        'updateBeneficiary': Globals.server + 'beneficiary/update',
        'getCountBeneficiary': Globals.server + 'beneficiary/getCount',
        'adharcheck': Globals.server + 'beneficiary/adharcheck',
        'pancheck': Globals.server + 'beneficiary/pancheck',
        'dlcheck': Globals.server + 'beneficiary/dlcheck',
        'ration': Globals.server + 'beneficiary/ration',
        "login":Globals.server+'user/login',
        "forgotPassword":Globals.server+'user/forgot',
        "changePassword":Globals.server+'user/reset',
        "checkEmail":Globals.server+'user/email',
        "changePass":Globals.server+'user/password',
        'upload': Globals.server + 'upload',
        'survey':Globals.server+ 'survey/addsurvey',
        'getSurvey':Globals.server+ 'survey/getsurvey',
        'getSurveyByID': Globals.server + 'survey/getSurveyById',
        'updatesurvey': Globals.server + 'survey/updatesurvey',
        'delsurvey': Globals.server + 'survey/delsurvey',
        'getBeneficiaryByStateDistrict':Globals.server+'paymentdemand/check',
        'addPaymentdemand':Globals.server+'paymentdemand/add',
        'getPaymentdemand':Globals.server+'paymentdemand/get',
        'delPaymentdemand':Globals.server+'paymentdemand/del',
        'updatePaymentdemand':Globals.server+'paymentdemand/update',
        'districtdelete':Globals.server+'master/districtdelete',
        'statedelete':Globals.server+'master/statedelete',
        'landdelete':Globals.server+'master/landdelete',
        'landnaturedelete':Globals.server+'master/landnaturedelete',
        'landtypedelete':Globals.server+'master/landtypedelete',
        'objectiontypedelete':Globals.server+'master/objectiontypedelete',
        'bankdelete':Globals.server+'master/bankdelete',
        'blockdelete':Globals.server+'master/blockdelete',
        'villagedelete':Globals.server+'master/villagedelete',

    };
}
