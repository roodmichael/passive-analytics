import { PageViewTracker } from '../';

import { IAnalyticsTracker, IEvent } from '../../types';

describe('Page View Tracker >', () => {
    let tracker: IAnalyticsTracker;
    let recordSpy;
    beforeEach(() => {
        recordSpy = jest.fn();

        tracker = new PageViewTracker();
        tracker.setRecord((event: IEvent) => recordSpy(event));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('PageView');
    });
    test('does nothing if not started', () => {
        expect(recordSpy).toHaveBeenCalledTimes(0);
    });
    test('records first page visit on start', () => {
        tracker.start();
        expect(recordSpy).toHaveBeenCalled();
    });
});