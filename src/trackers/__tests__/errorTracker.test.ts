import { ErrorTracker } from '../';
import { ConsoleProvider } from '../../providers';

import { IAnalyticsProvider, IAnalyticsTracker } from '../../types';

describe('Error Tracker >', () => {
    let provider: IAnalyticsProvider;
    let tracker: IAnalyticsTracker;
    let providerSpy;
    beforeEach(() => {
        providerSpy = jest.spyOn(ConsoleProvider.prototype, 'record');

        provider = new ConsoleProvider();
        tracker = new ErrorTracker(provider);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('Error');
    });
    test('does nothing if not started', () => {
        expect(providerSpy).toHaveBeenCalledTimes(0);
    });
    test('records javascript error from window.onerror', () => {
        tracker.start();
        window.onerror("A test message");
        expect(providerSpy).toHaveBeenCalled();
    });
});