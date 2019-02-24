import data from '../data/slides';

class GoogleMaps {
	constructor() {
		this.addPointer = this.addPointer.bind(this);
	}

	init() {
		this.renderMap(google);
	}

	renderMap() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 2,
			center: data.slides[0].coords
		});

		data.slides.forEach(this.addPointer);
	}

	addPointer(slide) {
		new google.maps.Marker({
			position: slide.coords,
			map: this.map
		});
	}
}

export default new GoogleMaps;