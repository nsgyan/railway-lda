import { environment } from "../../environments/environment.prod";
export class Globals {
    public static readonly server = environment.serverUrl;
    public static readonly route = {
        'AddState': Globals.server + 'master/add/state',
        'AddDistrict': Globals.server + 'master/add/district',
        'getState': Globals.server + 'master/state',

    };
}
