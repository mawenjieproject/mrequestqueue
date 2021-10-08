export interface IConfig{
    doingQueueMax?: number;
    priorityQueueMax?: number;
    retryQueueMax?: number;

    isUsePriorityQueue: boolean;
    
    isUseRetryQueue?: boolean;

    isReplace?: boolean;
    baseURL: string;
    headers?: any;
}