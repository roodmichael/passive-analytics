import { buildLeafNodeIdentifier, buildConcatenatedIdentifier } from '../';

const setupDom = () => {
    const idElement = window.document.createElement('span');
    idElement.setAttribute('id', 'title');
    window.document.body.append(idElement);

    const classElement = window.document.createElement('span');
    classElement.setAttribute('class', 'title');
    window.document.body.append(classElement);

    const textElement = window.document.createElement('h3');
    textElement.innerHTML = "title";
    window.document.body.append(textElement);

    const emptyElement = window.document.createElement('p');
    window.document.body.append(emptyElement);

    const parentElement = window.document.createElement('div');
    parentElement.setAttribute('id', 'parent');
    const childElement = window.document.createElement('h2');
    childElement.setAttribute('id', 'child');

    parentElement.append(childElement);
    window.document.body.append(parentElement);
};

describe('LIBRARY Identifiers', () => {
    const id = 'id';
    beforeAll(() => {
        setupDom();
    });
    describe('METHOD buildLeafNodeIdentifier', () => {
        test('builds correct ID leaf node identifier', () => {
            const initialTarget = window.document.getElementById('title');
            const initialResult = buildLeafNodeIdentifier(initialTarget, id);
            const expectedResult = 'span[@id="title"]';
    
            expect(initialResult).toEqual(expectedResult);
        });
        test('builds correct class leaf node identifier', () => {
            const initialTarget = window.document.getElementsByClassName('title')[0];
            const initialResult = buildLeafNodeIdentifier(initialTarget, id);
            const expectedResult = 'span[@class="title"]';
    
            expect(initialResult).toEqual(expectedResult);
        });
        test('builds correct text leaf node identifier', () => {
            const initialTarget = window.document.getElementsByTagName('h3')[0];
            const initialResult = buildLeafNodeIdentifier(initialTarget, id);
            const expectedResult = 'h3[text()="title"]';
    
            expect(initialResult).toEqual(expectedResult);
        });
        test('returns tag if no identifiable attributes', () => {
            const initialTarget = window.document.getElementsByTagName('p')[0];
            const initialResult = buildLeafNodeIdentifier(initialTarget, id);
            const expectedResult = 'p';
    
            expect(initialResult).toEqual(expectedResult);
        });
    });
    describe('METHOD buildConcatenatedIdentifier', () => {
        test('returns empty if document body', () => {
            const initialTarget = window.document.body;
            const initialResult = buildConcatenatedIdentifier(initialTarget, id);
    
            expect(initialResult).toBeFalsy();
        });
        test('returns concatenated identifier for parent and child', () => {
            const initialTarget = window.document.getElementById('child');
            const initialResult = buildConcatenatedIdentifier(initialTarget, id);
            const expectedResult = `parent:h2[@${id}="child"]`;

            expect(initialResult).toEqual(expectedResult);
        });
    });
});