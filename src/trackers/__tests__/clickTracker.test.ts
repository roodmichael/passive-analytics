import { ClickTracker } from '../';
import { ConsoleProvider } from '../../providers';

const setupDom = () => {
    const idElement = window.document.createElement('span');
    idElement.setAttribute('id', 'title');
    window.document.body.append(idElement);

    const customIdElement = window.document.createElement('span');
    idElement.setAttribute('data-pa-id', 'custom');
    window.document.body.append(customIdElement);

    const classElement = window.document.createElement('span');
    classElement.setAttribute('class', 'title');
    window.document.body.append(classElement);

    const textElement = window.document.createElement('h3');
    textElement.innerHTML = "title";
    window.document.body.append(textElement);

    const emptyElement = window.document.createElement('p');
    window.document.body.append(emptyElement);
};

describe('Click Tracker >', () => {
    let providerSpy;
    let provider;
    let tracker;
    beforeAll(() => {
        setupDom();
    });
    beforeEach(() => {
        providerSpy = jest.spyOn(ConsoleProvider.prototype, 'record');

        provider = new ConsoleProvider();
        tracker = new ClickTracker(provider);
    });
    afterEach(() => {
        tracker.stop();
        jest.clearAllMocks();
    });
    test('has tracker name', () => {
        expect(tracker.getTrackerName()).toEqual('Click');
    });
    test('does nothing if not started', () => {
        expect(providerSpy).toHaveBeenCalledTimes(0);
    });
    test('records click to dom id element correctly', () => {
        tracker.start();
        window.document.getElementById('title').dispatchEvent(new window.Event('click', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "span[@id=\"title\"]"}));
    });
    test('records click to dom id element correctly', () => {
        tracker.start();
        window.document.getElementsByClassName('title')[0].dispatchEvent(new window.Event('click', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "span[@class=\"title\"]"}));
    });
    test('records click to tag with no attributes but with text correctly', () => {
        tracker.start();
        window.document.getElementsByTagName('h3')[0].dispatchEvent(new window.Event('click', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "h3[text()=\"title\"]"}));
    });
    test('records click to empty element correctly', () => {
        tracker.start();
        window.document.getElementsByTagName('p')[0].dispatchEvent(new window.Event('click', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "p"}));
    });
    test('records click to custom dom id element correctly', () => {
        const initialConfiguration = { idAttribute: 'data-pa-id' };
        tracker.configure(initialConfiguration);
        tracker.start();
        window.document.querySelector('span[data-pa-id="custom"]').dispatchEvent(new window.Event('click', { bubbles: true }));
        expect(providerSpy).toHaveBeenCalledWith(expect.objectContaining({"name": "span[@data-pa-id=\"custom\"]"}));
    });
});