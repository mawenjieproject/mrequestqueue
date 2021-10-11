import getXhr from './xhr';

class Task {
    id: string;
    request: any;

    xhr: any;
    constructor(request: any) {
        this.id = request.url;
        this.request = request;
        this.xhr = null;
    }
    call(success: Function, error: Function) {
        this.xhr = getXhr(
            this.request,
            () => {
                success(this.id);
            },
            () => {
                error(this.id);
            }
        );
    }

    abort() {
        this.xhr.abort();
        this.request.reject({errCode: 'abort', message: 'abort request'});
    }
}

export default Task;
