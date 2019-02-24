import $ from 'jquery';
import data from '../data/slides';
import slides from './slides';

class GoogleMaps {
	constructor() {
		this.addMarker = this.addMarker.bind(this);
	}

	init() {
		this.renderMap(google);
	}

	renderMap() {
		this.map = new google.maps.Map($('#map').get(0), {
			zoom: 7,
			center: data.slides[0].coords
		});

		data.slides.forEach(this.addMarker);
	}

	addMarker(slide) {
		var marker = new google.maps.Marker({
			position: slide.coords,
			map: this.map
		});

		marker.addListener('click', () => {
			slides.changeToSlide(slide);
		});
	}

	smoothPanAndZoom(coords, zoom = 10) {
		// Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
		var jumpZoom = zoom - Math.abs(this.map.getZoom() - zoom);
		jumpZoom = Math.min(jumpZoom, zoom -1);
		jumpZoom = Math.max(jumpZoom, 3);

		// Zaczynamy od oddalenia mapy do wyliczonego powiększenia.
		this.smoothZoom(jumpZoom, () => {
			// Następnie przesuwamy mapę do żądanych współrzędnych.
			this.smoothPan(coords, () => {
				// Na końcu powiększamy mapę do żądanego powiększenia.
				this.smoothZoom(zoom);
			});
		});
	}

	smoothZoom(zoom, callback) {
		var startingZoom = this.map.getZoom();
		var steps = Math.abs(startingZoom - zoom);

		// Jeśli steps == 0, czyli startingZoom == zoom
		if(!steps) {
			// Jeśli podano trzeci argument
			if(callback) {
				// Wywołaj funkcję podaną jako trzeci argument.
				callback();
			}
			// Zakończ działanie funkcji
			return;
		}

		// Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
		var stepChange = - (startingZoom - zoom) / steps;

		var i = 0;
		// Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
		var timer = window.setInterval(() => {
			// Jeśli wykonano odpowiednią liczbę kroków
			if(++i >= steps) {
				// Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
				window.clearInterval(timer);
				// Jeśli podano trzeci argument
				if(callback) {
					// Wykonaj funkcję podaną jako trzeci argument
					callback();
				}
			}
			// Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
			this.map.setZoom(Math.round(startingZoom + stepChange * i));
		}, 80);
	}

	smoothPan(coords, callback) {
		var mapCenter = this.map.getCenter();
		coords = new google.maps.LatLng(coords);

		var steps = 12;
		var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

		var i = 0;
		var timer = window.setInterval(() => {
			if(++i >= steps) {
				window.clearInterval(timer);
				if(callback) callback();
			}
			this.map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
		}, 1000/30);
	}
}

export default new GoogleMaps;