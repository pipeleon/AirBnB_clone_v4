const amenitiesCheckboxList = [...document.querySelectorAll('.amenities input[type=checkbox]')];
const locationsCheckboxList = [...document.querySelectorAll('.locations input[type=checkbox]')];
const h4List = [...document.querySelectorAll('h4')];
const circle = document.querySelector('div#api_status');
const placesSection = document.querySelector('.places');
const button = document.querySelector('button');
const checkAmenities = [];
const amenitiesNames = [];
const checkStates = [];
const checkCities = [];
const locationsNames = [];
let info = {};

amenitiesCheckboxList.forEach(($check) => {
  $check.addEventListener('change', () => {
    if ($check.checked) {
      let textNames = '';
      let counter = 1;

      checkAmenities.push($check.getAttribute('data-id').slice(1));
      amenitiesNames.push($check.getAttribute('data-name').slice(1));

      amenitiesNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== amenitiesNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });

      h4List[1].textContent = textNames;
    } else {
      const id = checkAmenities.indexOf($check.getAttribute('data-id').slice(1));
      const id2 = amenitiesNames.indexOf($check.getAttribute('data-name').slice(1));
      let textNames = '';
      let counter = 1;

      checkAmenities.splice(id, 1);
      amenitiesNames.splice(id2, 1);

      amenitiesNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== amenitiesNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });
      if (textNames === '') {
        h4List[1].textContent = '\xa0';
      } else {
        h4List[1].textContent = textNames;
      }
    }
  });
});

locationsCheckboxList.forEach(($check) => {
  $check.addEventListener('change', () => {
    let textNames = '';
    let counter = 1;

    if ($check.checked) {
      if ($check.getAttribute('data-type') === ':state') {
        checkStates.push($check.getAttribute('data-id').slice(1));
      } else {
        checkCities.push($check.getAttribute('data-id').slice(1));
      }
      locationsNames.push($check.getAttribute('data-name').slice(1));
      locationsNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== locationsNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });

      h4List[0].textContent = textNames;
    } else {
      const id2 = locationsNames.indexOf($check.getAttribute('data-name').slice(1));
      let textNames = '';
      let counter = 1;

      if ($check.getAttribute('data-type') === ':state') {
        const id = checkStates.indexOf($check.getAttribute('data-id').slice(1));

        checkStates.splice(id, 1);
      } else {
        const id = checkCities.indexOf($check.getAttribute('data-id').slice(1));

        checkCities.splice(id, 1);
      }

      locationsNames.splice(id2, 1);
      locationsNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== locationsNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });
      if (textNames === '') {
        h4List[0].textContent = '\xa0';
      } else {
        h4List[0].textContent = textNames;
      }
    }
  });
});

async function getPlaces (info = {}) {
  const response = await window.fetch('http://localhost:5001/api/v1/places_search/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info)
  });

  const places = await response.json();

  places.forEach((place) => {
    const art = document.createElement('article');
    const title = document.createElement('div');
    const h2Title = document.createElement('h2');
    const price = document.createElement('div');
    const information = document.createElement('div');
    const guests = document.createElement('div');
    const rooms = document.createElement('div');
    const baths = document.createElement('div');
    const description = document.createElement('div');

    title.className = 'title_box';
    h2Title.textContent = place.name;
    price.className = 'price_by_night';
    price.textContent = `$${place.price_by_night}`;
    title.appendChild(h2Title);
    title.appendChild(price);
    art.appendChild(title);
    information.className = 'information';
    guests.className = 'max_guest';

    if (place.max_guest > 1) {
      guests.textContent = `${place.max_guest} Guests`;
    } else {
      guests.textContent = `${place.max_guest} Guest`;
    }
    rooms.className = 'number_rooms';
    if (place.number_rooms > 1) {
      rooms.textContent = `${place.number_rooms} Rooms`;
    } else {
      rooms.textContent = `${place.number_rooms} Room`;
    }
    baths.className = 'number_bathrooms';
    if (place.number_bathrooms > 1) {
      baths.textContent = `${place.number_bathrooms} Bathrooms`;
    } else {
      baths.textContent = `${place.number_bathrooms} Bathroom`;
    }
    information.appendChild(guests);
    information.appendChild(rooms);
    information.appendChild(baths);
    art.appendChild(information);
    description.className = 'description';
    description.innerHTML = place.description;
    art.appendChild(description);
    placesSection.appendChild(art);
  });
}

async function apiStatus () {
  const response = await window.fetch('http://localhost:5001/api/v1/status/');
  const flag = await response.json();
  if (flag.status === 'OK') {
    circle.classList.add('available');
  }
}

button.addEventListener('click', async () => {
  info = { states: checkStates, cities: checkCities, amenities: checkAmenities };
  placesSection.innerHTML = '';
  getPlaces(info);
});

getPlaces();
apiStatus();
