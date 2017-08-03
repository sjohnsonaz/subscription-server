import * as Express from 'express';
import { Controller, route } from 'sierra';

import Store from '../stores/SubscriptionStore';

export default class SubscriptionService extends Controller<Express.Router, Express.RequestHandler> {
    store: Store;

    constructor(store: Store) {
        super();
        this.store = store;
    }

    @route('get', '/', false)
    get(req, res) {
        res.send('Hello World!')
    }

    @route('post', '/api/save-subscription/', false)
    saveSubscription(req, res) {
        console.log('Creating subscription');

        if (!isValidSaveRequest(req, res)) {
            return;
        }

        return this.store.create(req.body)
            .then((subscriptionId) => {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({ data: { success: true } }));
            })
            .catch((err) => {
                res.status(500);
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    error: {
                        id: 'unable-to-save-subscription',
                        message: 'The subscription was received but we were unable to save it to our database.'
                    }
                }));
            });
    }
}

const isValidSaveRequest = (req, res) => {
    // Check the request body has at least an endpoint.
    if (!req.body || !req.body.endpoint) {
        // Not a valid subscription.
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            error: {
                id: 'no-endpoint',
                message: 'Subscription must have an endpoint.'
            }
        }));
        return false;
    }
    return true;
};