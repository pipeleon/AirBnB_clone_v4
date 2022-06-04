const amenities_checkbox_list = [...document.querySelectorAll('.amenities input[type=checkbox]')];
const locations_checkbox_list = [...document.querySelectorAll('.locations input[type=checkbox]')];
const h4_list = [...document.querySelectorAll('h4')];
const circle = document.querySelector("div#api_status")
const places_section = document.querySelector(".places")
const button = document.querySelector("button")

check_amenities = []
amenities_names = []
amenities_checkbox_list.forEach(($check) => {
    $check.addEventListener('change', () => {
        if ($check.checked) {
            check_amenities.push($check.getAttribute('data-id').slice(1))
            amenities_names.push($check.getAttribute('data-name').slice(1))
            text_names = ""
            counter = 1
            amenities_names.forEach((check_name) => {
                text_names = text_names + check_name
                if (counter != amenities_names.length) {
                    text_names = text_names + ", "
                }
                counter++
            })
            h4_list[1].textContent = text_names
        }
        else {
            const id = check_amenities.indexOf($check.getAttribute('data-id').slice(1))
            check_amenities.splice(id, 1)
            const id2 = amenities_names.indexOf($check.getAttribute('data-name').slice(1))
            amenities_names.splice(id2, 1)
            text_names = ""
            counter = 1
            amenities_names.forEach((check_name) => {
                text_names = text_names + check_name
                if (counter != amenities_names.length) {
                    text_names = text_names + ", "
                }
                counter++
            })
            if (text_names == "") {
                h4_list[1].textContent = "\xa0"
            }
            else {
                h4_list[1].textContent = text_names
            }
        }
    })
})

check_states = []
check_cities = []
locations_names = []
locations_checkbox_list.forEach(($check) => {
    $check.addEventListener('change', () => {
        if ($check.checked) {
            console.log($check.attributes)
            console.log($check.getAttribute('data-type'))
            if ($check.getAttribute('data-type') == ":state") {
                check_states.push($check.getAttribute('data-id').slice(1))
            }
            else {
                check_cities.push($check.getAttribute('data-id').slice(1))
            }
            locations_names.push($check.getAttribute('data-name').slice(1))
            text_names = ""
            counter = 1
            locations_names.forEach((check_name) => {
                text_names = text_names + check_name
                if (counter != locations_names.length) {
                    text_names = text_names + ", "
                }
                counter++
            })
            h4_list[0].textContent = text_names
        }
        else {
            if ($check.getAttribute('data-type') == ":state") {
                const id = check_states.indexOf($check.getAttribute('data-id').slice(1))
                check_states.splice(id, 1)
            }
            else {
                const id = check_cities.indexOf($check.getAttribute('data-id').slice(1))
                check_cities.splice(id, 1)
            }
            const id2 = locations_names.indexOf($check.getAttribute('data-name').slice(1))
            locations_names.splice(id2, 1)
            text_names = ""
            counter = 1
            locations_names.forEach((check_name) => {
                text_names = text_names + check_name
                if (counter != locations_names.length) {
                    text_names = text_names + ", "
                }
                counter++
            })
            if (text_names == "") {
                h4_list[0].textContent = "\xa0"
            }
            else {
                h4_list[0].textContent = text_names
            }
        }
    })
})


async function get_places (info = {}) {
    const response = await fetch('http://localhost:5001/api/v1/places_search/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    });
    const places = await response.json();
    places.forEach((place) => {
        const art = document.createElement('article')
        const title = document.createElement('div')
        title.className = "title_box"
        const title_h2 = document.createElement('h2')
        title_h2.textContent = place.name
        const price = document.createElement('div')
        price.className = "price_by_night"
        price.textContent = `$${place.price_by_night}`
        title.appendChild(title_h2)
        title.appendChild(price)
        art.appendChild(title)
        const information = document.createElement('div')
        information.className = "information"
        const guests = document.createElement('div')
        guests.className = "max_guest"
        if (place.max_guest > 1) {
            guests.textContent = `${place.max_guest} Guests`
        }
        else {
            guests.textContent = `${place.max_guest} Guest`
        }
        const rooms = document.createElement('div')
        rooms.className = "number_rooms"
        if (place.number_rooms > 1) {
            rooms.textContent = `${place.number_rooms} Rooms`
        }
        else {
            rooms.textContent = `${place.number_rooms} Room`
        }
        const baths = document.createElement('div')
        baths.className = "number_bathrooms"
        if (place.number_bathrooms > 1) {
            baths.textContent = `${place.number_bathrooms} Bathrooms`
        }
        else {
            baths.textContent = `${place.number_bathrooms} Bathroom`
        }
        information.appendChild(guests)
        information.appendChild(rooms)
        information.appendChild(baths)
        art.appendChild(information)
        const description = document.createElement('div')
        description.className = "description"
        description.innerHTML = place.description
        art.appendChild(description)        
        places_section.appendChild(art)
    })
}

get_places()

async function api_status () {
    const response = await fetch('http://localhost:5001/api/v1/status/');
    const flag = await response.json();
    if (flag["status"] == "OK") {
        circle.classList.add("available")
    }
}

api_status()

button.addEventListener('click', async () => {
    console.log(check_states)
    console.log(check_cities)
    info = {"states": check_states, "cities": check_cities, "amenities": check_amenities}
    places_section.innerHTML = ""
    get_places(info)
})