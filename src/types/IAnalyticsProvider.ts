import { IRecordEvent, IEvent } from './';

export interface IAnalyticsProvider {
    // name of the provider
    getProviderName(): string;

    // record events and return true if succeeded
    record(event: IEvent)

    send(events: IRecordEvent[]): Promise<boolean>
};