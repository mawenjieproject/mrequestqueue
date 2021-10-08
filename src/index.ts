import Ajax, {IAjax} from './Ajax';
import {IConfig} from './types';
import {defaultConfig} from './defaults';

function createInstance(config: IConfig): Ajax{
    const instance = new Ajax(config);
    return instance;
}

const ajax:IAjax = createInstance(defaultConfig);
ajax.create = function(config:IConfig): Ajax{
    return createInstance({...defaultConfig, ...config});
}

export {Ajax};

export default ajax;
