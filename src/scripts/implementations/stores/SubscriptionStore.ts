import { ISubscription } from '../../interfaces/data/ISubscription';

import Store from './Store';

export default class SubscriptionStore extends Store<ISubscription> {
    async create(subscription: ISubscription) {
        let docs = await this.list({ endpoint: subscription.endpoint });
        if (docs && docs.length) {
            return docs[0]._id;
        } else {
            return super.create(subscription);
        }
    }
}