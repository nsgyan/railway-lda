import { environment } from "../../environments/environment.prod";
export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'AddState': Globals.server + 'master/add/state',
        'AddDistrict': Globals.server + 'master/add/district',
        'AddBlock': Globals.server + 'master/add/block',
        'addVillage': Globals.server + 'master/add/village',
        'getState': Globals.server + 'master/state',
        'getDistrict': Globals.server + 'master/district',
        'getBlock': Globals.server + 'master/block',
        'blocksList': Globals.server + 'master/blockList',
        'districtList': Globals.server + 'master/districtList',
        'village': Globals.server + 'master/village',
        'getVillageByBlock': Globals.server + 'master/getVillageByBlock',

    };
}
