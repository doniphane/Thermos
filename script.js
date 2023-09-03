const cardContainer = document.querySelector(".container");
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude: ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  const A = crd.latitude;
  const B = crd.longitude;

  async function temperature() {
    const response = await fetch(`https://weather.contrateumdev.com.br/api/weather?lat=${A}&lon=${B}`);
    const data = await response.json();


    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    cardContainer.innerHTML = `
      <div class="card">
        <i class='bx bxs-thermometer bx-tada bx-sm'>Temperature: ${data.main.temp}°C</p></i>
        <div class="cardMaximum">
          <p>Temperature Maxium: ${data.main.temp_max}°C</p>
        </div>
        <div class="cardMinimum">
          <p>Temperature Minium: ${data.main.temp_min}°C</p>
        </div>
        <div class="cardPressure">
          <p>Pression: ${data.main.pressure}°C</p>
        </div>
        <div class="humidity">
          <p>Humidité: ${data.main.humidity}°C</p>
        </div>
        <div class="humidity">
          <p>Lever du soleil: ${sunrise}</p>
        </div>
        <div class="humidity">
          <p>Couchet du soleil:${sunset}</p>
        </div>
      </div>`;
  }

  temperature();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
