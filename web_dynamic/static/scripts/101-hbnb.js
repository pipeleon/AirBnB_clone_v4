const amenitiesCheckboxList = [...document.querySelectorAll('.amenities input[type=checkbox]')];
const locationsCheckboxList = [...document.querySelectorAll('.locations input[type=checkbox]')];
const h4List = [...document.querySelectorAll('h4')];
const circle = document.querySelector('div#api_status');
const placesSection = document.querySelector('.places');
const button = document.querySelector('button');

const checkAmenities = [];
const amenitiesNames = [];
amenitiesCheckboxList.forEach(($check) => {
  $check.addEventListener('change', () => {
    if ($check.checked) {
      checkAmenities.push($check.getAttribute('data-id').slice(1));
      amenitiesNames.push($check.getAttribute('data-name').slice(1));
      let textNames = '';
      let counter = 1;
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
      checkAmenities.splice(id, 1);
      const id2 = amenitiesNames.indexOf($check.getAttribute('data-name').slice(1));
      amenitiesNames.splice(id2, 1);
      let textNames = '';
      let counter = 1;
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

const checkStates = [];
const checkCities = [];
const locationsNames = [];
locationsCheckboxList.forEach(($check) => {
  $check.addEventListener('change', () => {
    if ($check.checked) {
      console.log($check.attributes);
      console.log($check.getAttribute('data-type'));
      if ($check.getAttribute('data-type') === ':state') {
        checkStates.push($check.getAttribute('data-id').slice(1));
      } else {
        checkCities.push($check.getAttribute('data-id').slice(1));
      }
      locationsNames.push($check.getAttribute('data-name').slice(1));
      let textNames = '';
      let counter = 1;
      locationsNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== locationsNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });
      h4List[0].textContent = textNames;
    } else {
      if ($check.getAttribute('data-type') === ':state') {
        const id = checkStates.indexOf($check.getAttribute('data-id').slice(1));
        checkStates.splice(id, 1);
      } else {
        const id = checkCities.indexOf($check.getAttribute('data-id').slice(1));
        checkCities.splice(id, 1);
      }
      const id2 = locationsNames.indexOf($check.getAttribute('data-name').slice(1));
      locationsNames.splice(id2, 1);
      let textNames = '';
      let counter = 1;
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
  const response = await fetch('http://localhost:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(info)
  });
  const places = await response.json();
  places.forEach(async (place) => {
    const art = document.createElement('article');
    const title = document.createElement('div');
    title.className = 'title_box';
    const title_h2 = document.createElement('h2');
    title_h2.textContent = place.name;
    const price = document.createElement('div');
    price.className = 'price_by_night';
    price.textContent = `$${place.price_by_night}`;
    title.appendChild(title_h2);
    title.appendChild(price);
    art.appendChild(title);
    const information = document.createElement('div');
    information.className = 'information';
    const guests = document.createElement('div');
    guests.className = 'max_guest';
    if (place.max_guest > 1) {
      guests.textContent = `${place.max_guest} Guests`;
    } else {
      guests.textContent = `${place.max_guest} Guest`;
    }
    const rooms = document.createElement('div');
    rooms.className = 'number_rooms';
    if (place.number_rooms > 1) {
      rooms.textContent = `${place.number_rooms} Rooms`;
    } else {
      rooms.textContent = `${place.number_rooms} Room`;
    }
    const baths = document.createElement('div');
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
    const description = document.createElement('div');
    description.className = 'description';
    description.innerHTML = place.description;
    art.appendChild(description);
    const placeAmenities = document.createElement('div');
    placeAmenities.className = 'amenities';
    const response2 = await fetch(`http://localhost:5001/api/v1/places/${place.id}/amenities`);
    const listAmenities = await response2.json();
    const titleAmenity = document.createElement('h2');
    titleAmenity.textContent = 'Amenities';
    const ulAmenity = document.createElement('ul');
    listAmenities.forEach((amenity) => {
      const liElement = document.createElement('li');
      liElement.textContent = amenity.name;
      ulAmenity.appendChild(liElement);
    });
    const reviews = document.createElement('div');
    reviews.className = 'reviews';
    const titleReview = document.createElement('h2');
    titleReview.textContent = 'Reviews';
    const buttonHide = document.createElement('span');
    buttonHide.textContent = 'show';
    buttonHide.addEventListener('click', () => {
      console.log('Button works');
    });
    if (buttonHide.textContent == 'hide') {
      const response3 = await fetch(`http://localhost:5001/api/v1/places/${place.id}/reviews`);
      const listReviews = await response3.json();
      titleReview.textContent = `${listReviews.length} Reviews`;
      const ulReview = document.createElement('ul');
      listReviews.forEach((review) => {
        const liElement = document.createElement('li');
        const title = document.createElement('h3');
        const text = document.createElement('p');
        title.textContent = `Posted on ${review.created_at.slice(0, 10)}`;
        text.innerHTML = review.text;
        liElement.appendChild(title);
        liElement.appendChild(text);
        ulReview.appendChild(liElement);
      });
      reviews.appendChild(titleReview);
      reviews.appendChild(ulReview);
    } else {
      reviews.textContent = '';
      reviews.appendChild(titleReview);
    }
    reviews.appendChild(buttonHide);
    placeAmenities.appendChild(reviews);
    placeAmenities.appendChild(titleAmenity);
    placeAmenities.appendChild(ulAmenity);
    art.appendChild(placeAmenities);
    placesSection.appendChild(art);
  });
}

getPlaces();

async function api_status () {
  const response = await fetch('http://localhost:5001/api/v1/status/');
  const flag = await response.json();
  if (flag.status == 'OK') {
    circle.classList.add('available');
  }
}

api_status();

button.addEventListener('click', async () => {
  info = { states: checkStates, cities: checkCities, amenities: checkAmenities };
  placesSection.innerHTML = '';
  getPlaces(info);
});
