import RequestQueue from './RequestQueue';
import utils from './utils';
import Task from './Task';

class Ajax {
    private rq: RequestQueue;
    private config: any;
    constructor(config: any) {
        this.config = config;
        this.rq = new RequestQueue(config);
    }
    get({ url, params, headers, isReplace }: any) {
        headers = utils.merge(headers, this.config.headers);
        return new Promise((resolve, reject) => {
            const task = new Task({
                url: this.config.baseURL + url,
                params, headers,
                isReplace,
                resolve,
                reject,
                method: 'get',
            });
            this.rq.addTask(task);
        });
    }
    post({ url, params, headers, data, isReplace }: any) {
        headers = utils.merge(headers, this.config.headers);
        return new Promise((resolve, reject) => {
            const task = new Task({
                url: this.config.baseURL + url,
                params, headers,
                isReplace,
                data,
                resolve,
                reject,
                method: 'post',
            });
            this.rq.addTask(task);
        });
    }
    clear() {
        this.rq.clear();
    }
}

export default Ajax;
