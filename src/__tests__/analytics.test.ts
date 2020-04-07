import Analytics from '../Analytics';

import { ConsoleProvider } from '../providers';
import { PageViewTracker } from '../trackers';

import { IAnalyticsConfig, IAnalyticsProvider, IAnalyticsTracker } from '../types';

const INITIAL_CONFIGURATION: IAnalyticsConfig = {
    visit_id: 'visit123',
    metadata: {
        'custom:fileno': 'fileno123',
        'Username': 'test@email.com'
    }
};

describe('Analytics Client >', () => {
    let analytics: Analytics;
    let provider: IAnalyticsProvider;
    let tracker: IAnalyticsTracker;
    beforeEach(() => {
        provider = new ConsoleProvider();
        tracker = new PageViewTracker(provider);
        analytics = new Analytics();
        analytics.configure(INITIAL_CONFIGURATION);
        analytics.setProvider(provider);
        analytics.addTracker(tracker);

    });
    test('is defined', () => {
        expect(analytics).toBeDefined();
    });
    test('correct provider defined', () => {
        const expectedResult = provider.getProviderName();
        const result = analytics.getProviderName();
        expect(result).toEqual(expectedResult);
    });
});