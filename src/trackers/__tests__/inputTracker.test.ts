import { InputTracker } from '../';
import { ConsoleProvider } from '../../providers';

const setupDom = () => {
    const inputElement = window.document.createElement('input');
    inputElement.setAttribute('id', 'input-test');
    window.document.body.append(inputElement);
};

describe('Input Tracker >', () => {
    let providerSpy;
    let provider;
    let tracker;
    beforeAll(() => {
        setupDom();
    });
    beforeEach(() => {
        providerSpy = jest.spyOn(ConsoleProvider.prototype, 'record');

        provider = new ConsoleProvider();
        tracker = new InputTracker(provider);
    });
    afterEach(() => {
        tracker.stop();
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('Input');
    });
    test('does nothing if not started', () => {
        expect(providerSpy).toHaveBeenCalledTimes(0);
    });
    test('records onchange event correct', () => {
        tracker.start();
        window.document.getElementById('input-test').dispatchEvent(new window.Event('change', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "input[@id=\"input-test\"]"}));
    });
});