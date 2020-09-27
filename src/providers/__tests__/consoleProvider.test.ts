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
    test('can set a session id', () => {
        const mockSessionId = 'session123';
        provider.setSessionId(mockSessionId);
        expect(provider.getSessionId()).toEqual(mockSessionId);
    });
    test('will not set a null session id', () => {
        const mockSessionId = 'session123';
        provider.setSessionId(mockSessionId);
        provider.setSessionId(null);
        expect(provider.getSessionId()).toEqual(mockSessionId);
    });
});