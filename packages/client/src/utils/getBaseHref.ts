export default (_document: Document) => {
	let bases = _document.getElementsByTagName('base');
	let baseHref = null;

	if (bases.length) {
		baseHref = bases[0].href;
	}

	return baseHref;
};