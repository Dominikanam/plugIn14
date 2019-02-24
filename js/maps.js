//import GoogleMapsLoader from 'google-maps';
import jQuery from 'jquery';
import data from '../data/slides';

class GoogleMaps {
	// constructor() {
	// 	GoogleMapsLoader.KEY = 'AIzaSyD5wJzzfxHDhI_KaSYldD5b9jnSamsa2Eg';
	// }

	init() {
		//GoogleMapsLoader.load(google => {
			console.log('map: init');
			//this.google = google;
			this.renderMap(google);
		//});
	}

	renderMap() {
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 7,
			center: data.slides[0].coords
		});

		// var markerOne = new google.maps.Marker({
		// 	position: coords,
		// 	map: map
		// });
	}
}

export default new GoogleMaps;