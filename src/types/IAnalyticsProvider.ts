import { IRecordEvent } from './';

export interface IAnalyticsProvider {
    // name of the provider
    getProviderName(): string;

    // record events and return true if succeeded
    record(event: IRecordEvent): Promise<boolean>
};