import { IEvent } from './';

export interface IAnalyticsProvider {
    // name of the provider
    getProviderName(): string;

    // record events and return true if succeeded
    record(event: IEvent): Promise<boolean>
};