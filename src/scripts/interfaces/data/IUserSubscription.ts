import { ISubscription } from './ISubscription';

export interface IUserSubscription {
    userId: number,
    subscriptions: ISubscription[];
}