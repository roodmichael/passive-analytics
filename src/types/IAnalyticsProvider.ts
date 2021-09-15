import { IRecordEvent, IEvent } from './';

export interface IAnalyticsProvider {
    // name of the provider
    getProviderName(): string;

    // session id
    getSessionId(): string;

    // sets session id
    setSessionId(sessionId: string): void;

    // record events and return true if succeeded
    record(event: IEvent): void;

    send(events: IRecordEvent[]): Promise<boolean>;
}