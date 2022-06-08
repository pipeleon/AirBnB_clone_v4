const button = document.querySelector('button');
const inputCheckboxList = [...document.querySelectorAll('input[type=checkbox]')];
const h4Amenities = [...document.querySelectorAll('h4')];
const circle = document.querySelector('div#api_status');
const placesSection = document.querySelector('.places');
const checkAmenities = [];
const checkNames = [];
let info = {};

inputCheckboxList.forEach(($check) => {
  $check.addEventListener('change', () => {
    if ($check.checked) {
      let textNames = '';
      let counter = 1;

      checkAmenities.push($check.getAttribute('data-id').slice(1));
      checkNames.push($check.getAttribute('data-name').slice(1));

      checkNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== checkNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });

      h4Amenities[1].textContent = textNames;
    } else {
      const id = checkAmenities.indexOf($check.getAttribute('data-id').slice(1));
      const id2 = checkNames.indexOf($check.getAttribute('data-name').slice(1));
      let textNames = '';
      let counter = 1;

      checkAmenities.splice(id, 1);
      checkNames.splice(id2, 1);

      checkNames.forEach((checkName) => {
        textNames = textNames + checkName;

        if (counter !== checkNames.length) {
          textNames = textNames + ', ';
        }

        counter++;
      });

      if (textNames === '') {
        h4Amenities[1].textContent = '\xa0';
      } else {
        h4Amenities[1].textContent = textNames;
      }
    }
  });
});

async function getPlaces () {
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
    rooms.className = 'number_rooms';
    baths.className = 'number_bathrooms';
    if (place.max_guest > 1) {
      guests.textContent = `${place.max_guest} Guests`;
    } else {
      guests.textContent = `${place.max_guest} Guest`;
    }
    if (place.number_rooms > 1) {
      rooms.textContent = `${place.number_rooms} Rooms`;
    } else {
      rooms.textContent = `${place.number_rooms} Room`;
    }
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
  info = { amenities: checkAmenities };
  placesSection.innerHTML = '';
  getPlaces(info);
});

getPlaces();
apiStatus();
