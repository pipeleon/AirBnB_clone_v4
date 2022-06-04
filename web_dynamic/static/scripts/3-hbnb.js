const input_checkbox_list = [...document.querySelectorAll('input[type=checkbox]')];
const h4_amenities = [...document.querySelectorAll('h4')];
const circle = document.querySelector("div#api_status")
const places_seccion = document.querySelector(".places")

check_amenities = []
check_names = []
input_checkbox_list.forEach(($check) => {
    $check.addEventListener('change', () => {
        if ($check.checked) {
            check_amenities.push($check.getAttribute('data-id').slice(1))
            check_names.push($check.getAttribute('data-name').slice(1))
            text_names = ""
            counter = 1
            check_names.forEach((check_name) => {
                text_names = text_names + check_name
                if (counter != check_names.length) {
                    text_names = text_names + ", "
                }
                counter++
            })
            h4_amenities[1].textContent = text_names
            console.log(check_amenities)
            console.log(text_names)
        }
        else {
            const id = check_amenities.indexOf($check.getAttribute('data-id').slice(1))
            check_amenities.splice(id, 1)
            const id2 = check_names.indexOf($check.getAttribute('data-name').slice(1))
            check_names.splice(id2, 1)
            text_names = ""
            counter = 1
            check_names.forEach((check_name) => {
                text_names = text_names + check_name
                if (counter != check_names.length) {
                    text_names = text_names + ", "
                }
                counter++
            })
            if (text_names == "") {
                h4_amenities[1].textContent = "\xa0"
            }
            else {
                h4_amenities[1].textContent = text_names
            }            
            console.log(check_amenities)
            console.log(text_names)
        }
    })
})

// circle.addEventListener('click', async () => {
//     const response = await fetch('http://localhost:5001/api/v1/status/');
//     const flag = await response.json();
//     console.log(flag["status"])
// })

info = {}

async function get_places () {
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
        places_seccion.appendChild(art)
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
