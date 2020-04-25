import { InputTracker } from '../';
import { ConsoleProvider } from '../../providers';

const setupDom = () => {
    const inputElement = window.document.createElement('input');
    inputElement.setAttribute('id', 'input-test');
    window.document.body.append(inputElement);

    const customInputElement = window.document.createElement('input');
    customInputElement.setAttribute('data-pa-id', 'custom-input-test');
    window.document.body.append(customInputElement);
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
    test('records onchange event to custom id element correctly', () => {
        const initialConfiguration = { idAttribute: 'data-pa-id' };
        tracker.configure(initialConfiguration);
        tracker.start();
        window.document.querySelector('input[data-pa-id="custom-input-test"]').dispatchEvent(new window.Event('change', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "input[@data-pa-id=\"custom-input-test\"]"}));
    });
});