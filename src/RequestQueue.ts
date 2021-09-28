import utils from './utils';
import Task from './Task';

class RequestQueue {
    private requestQueue: Task[];
    private doingQueue: Task[];
    private retryQueue: Task[];
    private max: number;
    private config: any;
    constructor(config: any) {
        this.requestQueue = [];
        this.doingQueue = [];
        this.retryQueue = [];
        this.config = config;

        this.max = 6;
    }
    walk() {
        let doingLen = this.doingQueue.length;
        if (doingLen < this.max && this.requestQueue.length > 0) {
            let task = this.requestQueue.shift();
            task && this.doingQueue.push(task);
            task?.call(
                (id: string) => {
                    this.deleteDoingById(id);
                },
                (id: string) => {
                    const tasks = this.deleteDoingById(id);
                    // this.retryQueue.concat(task);
                }
            );
            this.walk();
        }
        if (this.requestQueue.length === 50) {
            this.clear();
        }
    }

    clear() {
        while (this.doingQueue.length > 0) {
            const task = this.doingQueue.pop();
            task?.abort();
        }
        while (this.requestQueue.length > 0) {
            const task = this.requestQueue.pop();
            task?.abort();
        }
    }

    deleteDoingById(id: string) {
        // const task = this.doingQueue.find((i) => i.id === id);
        // task?.abort();
        const tasks = [];
        this.doingQueue.forEach((i)=>{
            if(i.id === id){
                tasks.push(i);
                i.abort();
            }
        });
        this.doingQueue = this.doingQueue.filter((i) => i.id !== id);
        this.walk();
        return tasks;
    }

    deleteRequestById(id: string) {
        this.requestQueue = this.requestQueue.filter((i) => i.id !== id);
    }

    addTask(task: any) {
        if (task.request.isReplace) {
            this.deleteRequestById(task.id);
            this.deleteDoingById(task.id);
            this.requestQueue.push(task);
        } else {
            this.requestQueue.push(task);
        }
        this.walk();
    }
}

export default RequestQueue;
