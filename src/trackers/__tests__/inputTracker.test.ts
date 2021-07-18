import { InputTracker } from '../';

import { IEvent } from '../../types';

const setupDom = () => {
    const inputElement = window.document.createElement('input');
    inputElement.setAttribute('id', 'input-test');
    window.document.body.append(inputElement);

    const customInputElement = window.document.createElement('input');
    customInputElement.setAttribute('data-pa-id', 'custom-input-test');
    window.document.body.append(customInputElement);
};

describe('Input Tracker >', () => {
    let recordSpy;
    let tracker;
    beforeAll(() => {
        setupDom();
    });
    beforeEach(() => {
        recordSpy = jest.fn();

        tracker = new InputTracker();
        tracker.setRecord((event: IEvent) => recordSpy(event));
    });
    afterEach(() => {
        tracker.stop();
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('Input');
    });
    test('does nothing if not started', () => {
        expect(recordSpy).toHaveBeenCalledTimes(0);
    });
    test('records onchange event correct', () => {
        tracker.start();
        window.document.getElementById('input-test').dispatchEvent(new window.Event('change', { bubbles: true }));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "input[@id=\"input-test\"]"}));
    });
    test('records onchange event to custom id element correctly', () => {
        const initialConfiguration = { idAttribute: 'data-pa-id' };
        tracker.configure(initialConfiguration);
        tracker.start();
        window.document.querySelector('input[data-pa-id="custom-input-test"]').dispatchEvent(new window.Event('change', { bubbles: true }));
        expect(recordSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "input[@data-pa-id=\"custom-input-test\"]"}));
    });
});