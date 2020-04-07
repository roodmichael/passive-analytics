export interface IAnalyticsTracker {
    // get name of tracker
    getTrackerName(): string;

    // configure the tracker
    configure?(config?: any): void;

    // start the tracker
    start(): void;
}