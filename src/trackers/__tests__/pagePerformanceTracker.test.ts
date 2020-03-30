import { PagePerformanceTracker } from '../';
import { ConsoleProvider } from '../../providers';

import { IAnalyticsProvider, IAnalyticsTracker } from '../../types';

describe('Page Performance Tracker >', () => {
    let provider: IAnalyticsProvider;
    let tracker: IAnalyticsTracker;
    beforeEach(() => {
        provider = new ConsoleProvider();
        tracker = new PagePerformanceTracker(provider);
    });
    test('is defined', () => {
        expect(tracker).toBeDefined();
    });
});