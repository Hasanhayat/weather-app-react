import './App.css'

function App() {

  function getCity() {
    let city = document.querySelector("#city").value;
    const apiKey = "0b3a4560180a457daa0152104242510";
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
  
    let img = document.querySelector("img");
    let temp = document.querySelector(".tempInCel");
    let details = document.getElementsByTagName("li");
    checkWeather();
    function checkWeather() {
      //axios method
      axios
        .get(URL)
        .then(function (respone) {
          console.log(respone.data);
  
          let data = respone.data;
          let Location = `Location:  ${data.location.name} , ${data.location.region} , ${data.location.country}`;
          let icon = `https:${data.current.condition.icon}`;
          let text = data.current.condition.text;
          let tempC = data.current.temp_c;
          let tempF = data.current.temp_f;
          let feelslike = data.current.feelslike_c;
          let humidity = data.current.humidity;
          let visibility = data.current.vis_km;
          let wind = data.current.wind_kph;
  
          img.src = icon;
          temp.innerHTML = `${tempC}°C<sub>(${text})</sub>`;
          details[0].innerText = Location;
          details[1].innerText = `Fahrenheit: ${tempF} °F`;
          details[2].innerText = `Feelslike: ${feelslike} °C`;
          details[3].innerText = `Humidity: ${humidity}%`;
          details[4].innerText = `Visibility: ${visibility}km`;
          details[5].innerText = `Wind Speed: ${wind}kp/h`;
        })
  
        .catch(function (err) {
          console.log(err);
          details[0].innerHTML = err.message+"<br> PLEASE CHECK INTERNET CONNECTION";
        });
    }}
}

export default App
