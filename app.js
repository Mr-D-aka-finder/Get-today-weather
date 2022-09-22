"use strict";

window.addEventListener("load", function () {
  //経度
  let long;
  //緯度
  let lat;
  let temperatureMaxDegree = document.querySelector(".temperature-max-degree");
  let temperatureMinDegree = document.querySelector(".temperature-min-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (this.navigator.geolocation) {
    this.navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temperature_2m_max, temperature_2m_min } = data.daily;
          const timezone = data.timezone;
          console.log(data);

          //Set DOM Elements from the API
          temperatureMaxDegree.textContent = temperature_2m_max[0];
          temperatureMinDegree.textContent = temperature_2m_min[0];
          locationTimezone.textContent = timezone;
        });
    });
  }
});
