import mustache from 'mustache';
import jQuery from 'jquery';

import slides from '../templates/slides.mustache';
import slideItem from '../templates/slideItem.mustache';
import data from '../data/slides';

export const init = () => {
	parse();
	render();
};

const parse = () => {
	mustache.parse(slides);
	mustache.parse(slideItem);
};

const render = () => {
	const element = jQuery('#app');
	const markup = mustache.render(slides, data, { slideItem });

	element.html(markup);
};