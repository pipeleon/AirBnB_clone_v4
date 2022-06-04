const input_checkbox_list = [...document.querySelectorAll('input[type=checkbox]')];
const h4_amenities = [...document.querySelectorAll('h4')];

check_amenities = []
check_names = []
input_checkbox_list.forEach(($check) => {
    $check.addEventListener('change', () => {
        if ($check.checked) {
            check_amenities.push($check.getAttribute('data-id'))
            check_names.push($check.getAttribute('data-name'))
            text_names = ""
            check_names.forEach((check_name) => {
                text_names = text_names + check_name
            })
            h4_amenities[1].textContent = text_names
            console.log(check_amenities)
            console.log(text_names)
        }
        else {
            const id = check_amenities.indexOf($check.getAttribute('data-id'))
            check_amenities.splice(id, 1)
            const id2 = check_names.indexOf($check.getAttribute('data-name'))
            check_names.splice(id2, 1)
            text_names = ""
            check_names.forEach((check_name) => {
                text_names = text_names + check_name
            })
            h4_amenities[1].textContent = text_names
            console.log(check_amenities)
            console.log(text_names)
        }
    })
})

async function api_status () {
    const response = await fetch('http://0.0.0.0:5001/api/v1/status/');
    const flag = await response.json();
    console.log(flag["status"])
}

api_status()