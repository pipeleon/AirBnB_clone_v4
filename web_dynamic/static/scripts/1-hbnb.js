window.onload = () => {
    const input_checkbox_list = [...document.querySelectorAll('input[type=checkbox]')];
    const h4_amenities = document.querySelector('h4');
    let amenities_list = [];
    for (let input_checkbox of input_checkbox_list) {
        input_checkbox.addEventListener('change', () => {
            if (this.checked) {
                amenities_list.push(`${input_checkbox.data-id}`);
            } else {
                for (let i = 0; i < amenities_list.length; i++) {
                    if (amenities_list[i] == `${input_checkbox.data-id}`) {
                        amenities_list.splice(i, 1);
                        i--;
                    }
                }
            }
        })
    }
    console.log(amenities_list);
}
