import Mustache from 'mustache';
import jQuery from 'jquery';

import slides from '../templates/slides.mustache';
import slideItem from '../templates/slideItem.mustache';
import data from '../data/slides';

export const init = () => {
	parse();
	render();
};

const parse = () => {
	Mustache.parse(slides);
	Mustache.parse(slideItem);
};

const render = () => {
	const element = jQuery('#app');
	const markup = Mustache.render(slides, data, { slideItem });

	element.html(markup);
};