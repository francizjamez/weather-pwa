function App() {
  return (
    <div className="App">
      <div class="header">
        <h1>Weather and pollution info</h1>
        <div className="form">
          <div className="location">
            <span>Location: </span> <input type="”text”" />
          </div>
          <button onClick={(e) => getData()}>Get info</button>
        </div>
      </div>

      <div className="content">
        <h1 className="name">sample</h1>
        <p>
          <span className="temperature"></span>
        </p>
        <p>
          <span className="quality"></span>
        </p>
      </div>
    </div>
  );

  async function getData() {
    let link = `https://api.weatherapi.com/v1/current.json`;

    let key = "8e46beb75aec4fa8b76105922211504";

    let content = document.querySelector(".content");

    let q = document.querySelector("input").value;
    let url = `${link}?key=${key}&q=${q}&aqi=yes`;

    let response;
    let data;
    try {
      response = await fetch(url);
      data = await response.json();
    } catch (err) {
      console.log(err);
    }

    if (data.error) {
      let content = document.querySelector(".content");
      content.classList.remove("active");

      let name = document.querySelector(".name");
      name.innerHTML = "Error";

      let paragraphs = document.querySelectorAll("p");
      paragraphs.forEach((p) => (p.style.display = "none"));

      setTimeout(() => content.classList.add("active"), 100);
      return;
    }

    let name = document.querySelector(".name");
    name.innerHTML = data.location.name;
    name.innerHTML += ", ";
    name.innerHTML += data.location.country;

    let paragraphs = document.querySelectorAll("p");
    paragraphs.forEach((p) => (p.style.display = "block"));

    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = "Temperature: ";
    temperature.innerHTML += data.current.temp_c;
    temperature.innerHTML += "°C";

    let airQuality = document.querySelector(".quality");
    airQuality.innerHTML = "Air Quality: ";
    airQuality.innerHTML += getAQI(data.current.air_quality.pm10);

    content.classList.remove("active");

    setTimeout(() => content.classList.add("active"), 100);
  }

  function getAQI(aqi) {
    if (aqi <= 50) {
      return "Good: 😁";
    } else if (aqi <= 100) {
      return "Moderate: 😊";
    } else if (aqi <= 150) {
      return "Orange: 😐";
    } else if (aqi <= 200) {
      return "Red: 😷";
    } else if (aqi <= 250) {
      return "Purple: 🤢";
    } else {
      return "Maroon: 💀";
    }
  }
}

export default App;
