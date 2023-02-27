const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public/about"));

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pablo Indalta",
    footer: "Indalta Records, all rights are reserved. Mojogn",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "A B O U T - P A G E",
    name: "Pablo Indalta",
    footer: "Indalta Records, Mojogn reserved.",
  });
});

app.get("/help", (req, res) => {
  res.render("Help", {
    title: "H E L P - P A G E",
    name: "Pablo Indalta",
    message:
      "If you need any help or you have a doubt, please contact us on the chat option below",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You need to provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query.search);
  res.send({
    products: ["Hogwarts Legacy", "Sonic Frontiers"],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pablo Indalta",
    errorMsg: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pablo Indalta",
    errorMsg: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
