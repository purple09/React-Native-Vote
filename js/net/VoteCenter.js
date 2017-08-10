import { baseUrl, getToken } from './Constant';
import NetUtil from './NetUtil';

const voteUrl = baseUrl + "/votecenter";

export default {
    getList(page, num) {
        return NetUtil.get(voteUrl + `/activities?page=${page}&num=${num}`);
    },
    getDetail(id) {
        const token = getToken();
        return NetUtil.get(voteUrl + `/activity/${id}/info` + (token.length > 0 ? `?user_token=${token}` : ''));
    },
    vote(activity_id, option_id) {
        const token = getToken();
        return NetUtil.get(voteUrl + `/activity/${activity_id}/options/${option_id}/vote?user_token=${token}`);
    }
}