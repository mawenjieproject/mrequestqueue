import utils from './utils';

function encode(val: any) {
    return encodeURIComponent(val)
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
export function buildUrl(url: any, params: any, paramsSerializer?: any) {
    if (!params) {
        return url;
    }

    let serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        let parts: any[] = [];

        utils.forEach(params, function serialize(val: any, key: any) {
            if (val === null || typeof val === 'undefined') {
                return;
            }

            if (utils.isArray(val)) {
                // eslint-disable-next-line no-param-reassign
                key = key + '[]';
            } else {
                // eslint-disable-next-line no-param-reassign
                val = [val];
            }

            utils.forEach(val, function parseValue(v: any) {
                if (utils.isDate(v)) {
                    // eslint-disable-next-line no-param-reassign
                    v = v.toISOString();
                } else if (utils.isObject(v)) {
                    // eslint-disable-next-line no-param-reassign
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + '=' + encode(v));
            });
        });

        serializedParams = parts.join('&');
    }

    if (serializedParams) {
        const hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
            // eslint-disable-next-line no-param-reassign
            url = url.slice(0, hashmarkIndex);
        }

        // eslint-disable-next-line no-param-reassign
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
}
