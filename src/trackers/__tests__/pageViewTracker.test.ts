import { PageViewTracker } from '../';
import { ConsoleProvider } from '../../providers';

import { IAnalyticsProvider, IAnalyticsTracker } from '../../types';

describe('Page View Tracker >', () => {
    let provider: IAnalyticsProvider;
    let tracker: IAnalyticsTracker;
    beforeEach(() => {
        provider = new ConsoleProvider();
        tracker = new PageViewTracker(provider);
    });
    test('is defined', () => {
        expect(tracker).toBeDefined();
    });
});