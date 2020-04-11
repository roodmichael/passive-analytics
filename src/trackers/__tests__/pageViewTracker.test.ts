import { PageViewTracker } from '../';
import { ConsoleProvider } from '../../providers';

import { IAnalyticsProvider, IAnalyticsTracker } from '../../types';

describe('Page View Tracker >', () => {
    let provider: IAnalyticsProvider;
    let tracker: IAnalyticsTracker;
    let providerSpy;
    beforeEach(() => {
        providerSpy = jest.spyOn(ConsoleProvider.prototype, 'record');

        provider = new ConsoleProvider();
        tracker = new PageViewTracker(provider);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('PageView');
    });
    test('does nothing if not started', () => {
        expect(providerSpy).toHaveBeenCalledTimes(0);
    });
    test('records first page visit on start', () => {
        tracker.start();
        expect(providerSpy).toHaveBeenCalled();
    });
});