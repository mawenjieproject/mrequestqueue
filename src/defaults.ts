import {IConfig} from './types';
export const defaultConfig:IConfig={
    doingQueueMax: 6,
    priorityQueueMax: 100,
    retryQueueMax: 100,

    isUsePriorityQueue: false,
    
    isUseRetryQueue: false,

    isReplace: false,
    baseURL: ''
}