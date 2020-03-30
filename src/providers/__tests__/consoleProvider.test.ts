import { ConsoleProvider } from '../';

import { IAnalyticsProvider } from '../../types';

describe('Console Provider >', () => {
    let provider: IAnalyticsProvider;
    beforeEach(() => {
        provider = new ConsoleProvider();
    });
    test('is defined', () => {
        expect(provider).toBeDefined();
    });
});