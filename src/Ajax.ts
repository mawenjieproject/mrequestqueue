import RequestQueue from './RequestQueue';
import utils from './utils';
import Task from './Task';
import { IConfig } from './types';
export interface IAjax{
    request: (params: any)=>Promise<unknown>;
    get: (params: any)=>Promise<unknown>;
    post: (params: any)=>Promise<unknown>;
    clear: ()=>void;
    create?: (config: IConfig)=>Ajax;
}
class Ajax implements IAjax {
    private rq: RequestQueue;
    private config: IConfig;
    constructor(config: IConfig) {
        this.config = config;
        this.rq = new RequestQueue(config);
    }
    request({ url, params, headers, data, isReplace, method='post' }: any) {
        headers = utils.merge(headers, this.config.headers);
        return new Promise((resolve, reject) => {
            const task = new Task({
                url: this.config.baseURL + url,
                params, headers,
                isReplace,
                data,
                resolve,
                reject,
                method: method,
            });
            this.rq.addTask(task);
        });
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
