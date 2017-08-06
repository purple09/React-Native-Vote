import { baseUrl, token } from './Constant';
import NetUtil from './NetUtil';

const userUrl = baseUrl + "/usercenter";

export default {
    getPublicUserinfoList(userIds) {
        if(Array.isArray(userIds)&&userIds.length>0){
            userids = userIds.join(',');
        }
        return NetUtil.get(userUrl + `/get_public_user_info_list?user_ids=${userIds}`);
    },

}