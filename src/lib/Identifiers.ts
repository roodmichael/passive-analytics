export const buildLeafNodeIdentifier = (element: Element, id: string): string => {
    const tagName = element.tagName.toLowerCase();
    if (element.getAttribute(id)) {
        return `${tagName}[@${id}="${element.getAttribute(id)}"]`;
    }

    if (element.id) {
        return `${tagName}[@id="${element.id}"]`;
    }

    if (element.className) {
        return `${tagName}[@class="${element.className}"]`;
    }

    if (element.textContent) {
        return `${tagName}[text()="${element.textContent}"]`;
    }

    return tagName;
}

export const buildConcatenatedIdentifier = (element: Element, id: string, isParent?: boolean): string => {
    if (element === document.body) {
        return '';
    }

    let identifier = '';
    if (isParent) {
        identifier = element.hasAttribute(id) ? `${element.getAttribute(id)}:` : '';
    } else {
        identifier = element.hasAttribute(id) ? element.getAttribute(id) : buildLeafNodeIdentifier(element, id);
    }

    return buildConcatenatedIdentifier(element.parentElement, id, true) + identifier;
}