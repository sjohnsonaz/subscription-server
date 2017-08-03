import * as Datastore from 'nedb';

import Config from './config';
import SubscriptionService from './implementations/services/SubscriptionService';
import SubscriptionStore from './implementations/stores/SubscriptionStore';

import SubscriptionApplication from './implementations/SubscriptionApplication';

export function run() {
    const application = new SubscriptionApplication(Config);

    const db = new Datastore({
        filename: './data/subscriptionData.txt'
    });
    db.loadDatabase();
    const store = new SubscriptionStore(db);
    const subscriptionService = new SubscriptionService(store);

    application.addController(subscriptionService);
    application.init();
    application.listen();
}