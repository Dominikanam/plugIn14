import Mustache from 'mustache';
import $ from 'jquery';

import slidesTemplate from '../templates/slides.mustache';
import slideItemTemplate from '../templates/slideItem.mustache';
import data from '../data/slides';
import maps from './maps';

var carouselOptions = { resize: true, wrapAround: true, pageDots: false  };

class Slides {
	init() {
		this.parse();
		this.render();
	}

	parse() {
		Mustache.parse(slidesTemplate);
		Mustache.parse(slideItemTemplate);
	}

	render () {
		var element = $('#app');
		var markup = Mustache.render(
			slidesTemplate, data, { slideItem: slideItemTemplate }
		);

		element.html(markup);
		this.carousel = new Flickity(
			$('.carousel').get(0), carouselOptions
		);

		this.carousel.on( 'change', index => {
			maps.smoothPanAndZoom(
				data.slides[index].coords
			);
		});
	}

	changeToSlide(slide) {
		this.carousel.select(
			data.slides.findIndex(s => s === slide)
		);
	}
}

export default new Slides();