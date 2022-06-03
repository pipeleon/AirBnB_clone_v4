// window.onload = () => {
//     const input_checkbox_list = [...document.querySelectorAll('input[type=checkbox]')];
//     const h4_amenities = document.querySelector('h4');
//     let amenities_list = [];
//     for (let input_checkbox of input_checkbox_list) {
//         input_checkbox.addEventListener('change', () => {
//             if (this.checked) {
//                 amenities_list.push(`${input_checkbox.data-id}`);
//             } else {
//                 for (let i = 0; i < amenities_list.length; i++) {
//                     if (amenities_list[i] == `${input_checkbox.data-id}`) {
//                         amenities_list.splice(i, 1);
//                         i--;
//                     }
//                 }
//             }
//         })
//     }
//     console.log(amenities_list);
// }

const input_checkbox_list = [...document.querySelectorAll('input[type=checkbox]')];
const h4_amenities = document.querySelector('h4');

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
            h4_amenities.text = text_names
            console.log(check_amenities)
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
            h4_amenities.text = text_names
            console.log(check_amenities)
        }
    })
})
