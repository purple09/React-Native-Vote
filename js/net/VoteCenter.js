import {baseUrl} from './Constant';
import NetUtil from './NetUtil';

const voteUrl = baseUrl + "/votecenter";

export default {
    getList(page, num) {
        return NetUtil.get(voteUrl + `/activities?page=${page}&num=${num}`);
    }
}