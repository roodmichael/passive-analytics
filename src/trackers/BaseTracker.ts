import { IAnalyticsBaseTracker, IEvent } from '../types';

export class BaseTracker implements IAnalyticsBaseTracker {
    protected _record: (event: IEvent) => {};

    public setRecord(recordFunction: (event: IEvent) => {}): void {
        this._record = recordFunction;
    }
}