const input_checkbox_list = [...document.querySelectorAll('input[type=checkbox]')];
const h4_amenities = [...document.querySelectorAll('h4')];
const circle = document.querySelector("div#api_status")

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
    const flag = await response.json();
    console.log(flag.length)
}

get_places()

async function api_status () {
    const response = await fetch('http://localhost:5001/api/v1/status/');
    const flag = await response.json();
    console.log(flag)
    if (flag["status"] == "OK") {
        circle.classList.add("available")
    }
}

api_status()
