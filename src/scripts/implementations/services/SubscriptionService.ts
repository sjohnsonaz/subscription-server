import * as Express from 'express';
import { Controller, route, middleware } from 'sierra';

import Store from '../stores/SubscriptionStore';

export default class SubscriptionService extends Controller<Express.Router, Express.RequestHandler> {
    store: Store;

    constructor(store: Store) {
        super();
        this.store = store;
    }

    @route('get', '/api/subscription/', false)
    async list(req, res, next) {
        try {
            let subscriptionId = await this.store.list(req.query);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(subscriptionId));
        } catch (err) {
            next(err);
        }
    }

    @route('get', '/api/subscription/:id', false)
    async get(req, res, next) {
        try {
            let subscription = await this.store.get(req.params.id);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(subscription));
        } catch (err) {
            next(err);
        }
    }

    @route('post', '/api/subscription/', false)
    @middleware(isValidSaveRequest as any)
    async post(req, res, next) {
        try {
            let subscriptionId = await this.store.create(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(subscriptionId));
        } catch (err) {
            next(err);
        }
    }

    @route('put', '/api/subscription/:id', false)
    @middleware(isValidSaveRequest as any)
    async put(req, res, next) {
        try {
            let number = await this.store.update(req.params.id, req.body);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(number));
        } catch (err) {
            next(err);
        }
    }

    @route('delete', '/api/subscription/:id', false)
    async delete(req, res, next) {
        try {
            let number = await this.store.delete(req.params.id);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(number));
        } catch (err) {
            next(err);
        }
    }
}

function isValidSaveRequest(req, res, next) {
    // Check the request body has at least an endpoint.
    if (!req.body || !req.body.endpoint) {
        next(new Error('Subscription must have an endpoint.'));
    } else {
        next();
    }
}