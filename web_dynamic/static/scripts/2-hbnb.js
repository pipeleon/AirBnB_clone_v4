const inputCheckboxList = [...document.querySelectorAll('input[type=checkbox]')];
const h4Amenities = [...document.querySelectorAll('h4')];
const circle = document.querySelector('div#api_status');
const checkAmenities = [];
const checkNames = [];

inputCheckboxList.forEach(($check) => {
  $check.addEventListener('change', () => {
    if ($check.checked) {
      checkAmenities.push($check.getAttribute('data-id').slice(1));
      checkNames.push($check.getAttribute('data-name').slice(1));
      let textNames = '';
      let counter = 1;
      checkNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== checkNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });
      h4Amenities[1].textContent = textNames;
      console.log(checkAmenities);
      console.log(textNames);
    } else {
      const id = checkAmenities.indexOf($check.getAttribute('data-id').slice(1));
      checkAmenities.splice(id, 1);
      const id2 = checkNames.indexOf($check.getAttribute('data-name').slice(1));
      checkNames.splice(id2, 1);
      let textNames = '';
      let counter = 1;
      checkNames.forEach((checkName) => {
        textNames = textNames + checkName;
        if (counter !== checkNames.length) {
          textNames = textNames + ', ';
        }
        counter++;
      });
      h4Amenities[1].textContent = textNames;
      console.log(checkAmenities);
      console.log(textNames);
    }
  });
});

async function apiStatus () {
  const response = await window.fetch('http://localhost:5001/api/v1/status/');
  const flag = await response.json();
  if (flag.status === 'OK') {
    circle.classList.add('available');
  }
}

apiStatus();
