export type IEvent = {
    eventId: string;
    name: string;
    attribute: string;
    metric: string;
    session: string;
};

export type IRecordEvent = {
    timestamp: number;
    event: IEvent;
};

export interface IAnalyticsProvider {
    // name of the provider
    getProviderName(): string;

    // record events and return true if succeeded
    record(event: IRecordEvent): Promise<boolean>
};