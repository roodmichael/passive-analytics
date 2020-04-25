export const buildLeafNodeIdentifier = (element: Element, id: string) => {
    const tagName = element.tagName.toLowerCase();
    if (element.getAttribute(id)) {
        return `${tagName}[@${id}="${element.getAttribute(id)}"]`;
    }

    if (element.className) {
        return `${tagName}[@class="${element.className}"]`;
    }

    if (element.textContent) {
        return `${tagName}[text()="${element.textContent}"]`;
    }

    return tagName;
}

export const buildConcatenatedIdentifier = (element: Element, id: string, isParent?: boolean) => {
    if (element === document.body) {
        return '';
    }

    let identifier = buildLeafNodeIdentifier(element, id);
    if (isParent) {
        identifier = element.getAttribute(id) ? `${element.getAttribute(id)}:` : '';
    }

    return buildConcatenatedIdentifier(element.parentElement, id, true) + identifier;
}