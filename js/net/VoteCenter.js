import { baseUrl, token } from './Constant';
import NetUtil from './NetUtil';

const voteUrl = baseUrl + "/votecenter";

export default {
    getList(page, num) {
        return NetUtil.get(voteUrl + `/activities?page=${page}&num=${num}`);
    },
    getDetail(id) {
        return NetUtil.get(voteUrl + `/activity/${id}/info` + (token.length > 0 ? `?user_token=${token}` : ''));
    }
}