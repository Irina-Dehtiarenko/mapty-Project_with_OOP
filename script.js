'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pl/maps/@${latitude},${longitude}z`);

      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13); //drugi parametr to zoom
      // console.log(map);

      L.tileLayer(
        //  'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',//nie wiem dlaczego nie działa
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png', //wykorzystuje open street map, chociaż są inne style
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
      ).addTo(map);

      // from leaflet - special object(on is like eventListener)
      map.on('click', function (mapEvent) {
        // mapEvent.latlng - coordinats
        console.log(mapEvent);
        const { lat, lng } = mapEvent.latlng;
        // L.marker([lat, lng]).addTo(map).bindPopup('Workout').openPopup();
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            L.popup({
              // changing of popup's view
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: 'running-popup',
            })
          )
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
}
