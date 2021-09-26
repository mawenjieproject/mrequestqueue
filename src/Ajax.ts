import RequestQueue from './RequestQueue';

class Ajax {
    private rq: RequestQueue;
    private config: any;
    constructor(config: any) {
        this.config = config;
        this.rq = new RequestQueue(config);
    }
    get({ url, params, headers, isReplace }: any) {
        return new Promise((resolve, reject) => {
            this.rq.addTask({
                url: this.config.baseURL + url,
                params,
                headers,
                isReplace,
                resolve,
                reject,
                type: 'get',
            });
        });
    }
    post({ url, params, headers, isReplace }: any) {
        return new Promise((resolve, reject) => {
            this.rq.addTask({
                url: this.config.baseURL + url,
                params,
                headers,
                isReplace,
                resolve,
                reject,
                type: 'post',
            });
        });
    }
    clear() {
        this.rq.clear();
    }
}

export default Ajax;
