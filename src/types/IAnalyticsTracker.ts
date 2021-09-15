import { IAnalyticsBaseTracker } from './';

export interface IAnalyticsTracker extends IAnalyticsBaseTracker {
    // get name of tracker
    getTrackerName(): string;

    // configure the tracker
    configure?(config?: unknown): void;

    // start the tracker
    start(): void;
}