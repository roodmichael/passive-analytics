export  const buildLeafNodeIdentifier = (element: Element) => {
    const tagName = element.tagName.toLowerCase();
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

export const buildConcatenatedIdentifier = (element: Element, isParent?: boolean) => {
    if (element === document.body) {
        return '';
    }

    let identifier = buildLeafNodeIdentifier(element);
    if (isParent) {
        identifier = element.id ? `${element.id}:` : '';
    }

    return buildConcatenatedIdentifier(element.parentElement, true) + identifier;
}