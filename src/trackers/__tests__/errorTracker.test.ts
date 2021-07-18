import { ErrorTracker } from '../';

import { IAnalyticsTracker, IEvent } from '../../types';

describe('Error Tracker >', () => {
    let tracker: IAnalyticsTracker;
    let recordSpy;
    beforeEach(() => {
        recordSpy = jest.fn();

        tracker = new ErrorTracker();
        tracker.setRecord((event: IEvent) => recordSpy(event));
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('Error');
    });
    test('does nothing if not started', () => {
        expect(recordSpy).toHaveBeenCalledTimes(0);
    });
    test('records javascript error from window.onerror', () => {
        tracker.start();
        window.onerror("A test message");
        expect(recordSpy).toHaveBeenCalled();
    });
});