import Controller, { route, middleware } from 'sierra';
import Gateway from './Gateway';

export default class Service<T extends Gateway<any>> extends Controller {
    gateway: T
    constructor(base: string, gateway: T) {
        super(base);
        this.gateway = gateway;
    }
}
