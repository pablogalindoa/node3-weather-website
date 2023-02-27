const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=df94ef30d2e13aeb3696b308a5db338a&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to Weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          "\n. It is currently " +
          body.current.temperature +
          " degrees. \n It feels like " +
          body.current.feelslike +
          " degrees. \nThere is a " +
          body.current.precip +
          "% chance of rain. " +
          " The wind speed is: " +
          body.current.wind_speed +
          " km/hr. " +
          " And the current date and time are: " +
          body.location.localtime
      );
    }
  });
};

module.exports = forecast;
