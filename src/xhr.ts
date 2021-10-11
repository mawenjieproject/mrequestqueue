import { isPlainObject } from './utils';
import { buildUrl } from './helper';
/**
 * 处理 data，因为 send 无法直接接受 json 格式数据，这里我们可以直接序列化之后再传给服务端
 * @param {*} data
 */
function transformData(data: any) {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

function transformHeaders(headers: any) {
    const contentTypeKey = 'Content-Type'; // Content-Type 的 key 值常量
    if (isPlainObject(headers)) {
        Object.keys(headers).forEach((key) => {
            if (key !== contentTypeKey && key.toUpperCase() === contentTypeKey.toLowerCase()) {
                // 如果 key 的大写和 contentTypeKey 的大写一致，证明是同一个，这时就可以用 contentTypeKey 来替代 key 了
                headers[contentTypeKey] = headers[key];
                delete headers[key];
            }
        });
        if (!headers[contentTypeKey]) {
            // 如果最后发现没有 Content-Type，那我们就设置一个默认的
            headers[contentTypeKey] = 'application/json;charset=utf-8';
        }
    }
}

function getXhr(config: any, success: Function, error: Function) {
    const {
        url,
        method = 'get',
        params = {},
        body = null,
        responseType,
        headers,
        timeout,
        resolve,
        reject,
    } = config;
    const request = new XMLHttpRequest();

    /**
     * 调用 open 方法
     * method.toUpperCase() 的作用主要是讲 method 都标准统一为大写字母状态。 比如 'get'.toUpperCase() 会返回 'GET'
     */
    request.open(method.toUpperCase(), buildUrl(url, params));

    if (responseType) {
        // 如果设置了响应类型，则为 request 设置 responseType
        request.responseType = responseType;
    }

    if (timeout) {
        // 如果设置超时时间， 则为 request 设置 timeout
        request.timeout = timeout;
    }

    // 设置头部
    transformHeaders(headers);
    Object.keys(headers).forEach((key) => {
        if (!body && key === 'Content-Type') {
            delete headers[key];
            return;
        }
        request.setRequestHeader(key, headers[key]);
    });

    request.onreadystatechange = (ev: Event) => {
        if (request.readyState !== 4) return null;
        if (request.status === 0) return null;
        const responseData =
            request.responseType === 'text' ? request.responseText : request.response;
        if ((request.status >= 200 && request.status < 300) || request.status === 304) {
            const data: any = JSON.parse(responseData);
            data.status = request.status;
            config.resolve(data);
            success();
        } else {
            reject(new Error(`Request failed with status code ${request.status}`));
            error();
        }
        return null;
    };

    request.onerror = () => {
        reject(new Error('Network Error'));
        error();
    };

    request.ontimeout = () => {
        reject(new Error(`Timeout of ${timeout} ms exceeded`));
        error();
    };

    request.send(transformData(body));

    return request;
}

export default getXhr;
