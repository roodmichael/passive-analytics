import { IEvent } from './';

export interface IAnalyticsBaseTracker {
    // set record functionality
    setRecord(recordFunction: (event: IEvent) => {}): void;
}