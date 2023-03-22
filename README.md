# Weather Dashboard

## Table of Contents

* [Description](#description)
* [Code Examples](#code-examples)
* [Important links](#important-links)
* [Questions](#questions)

## Description

The purpose of this project was to create a an online weather dashboard that can be used to search for various cities and display a five day forcat for those cities.


## Code Examples
Example of Code used to create display for weather information:

```js
mycard.addClass("card");
      col.append(mycard);
      var p = $("<p>").text(formatedDate);
      var iconUrl = "https://openweathermap.org/img/wn/" + iconId + "@2x.png";
      var weatherImage = $("<img>");
```
Example of Code used to retreive API data.

```js
function getUV(lat, lon) {
  var uvIndexURL =
    "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=" +
    apiKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon +
    "&cnt=1";
  $.ajax({ url: uvIndexURL, type: "GET" }).then(function (response) {
    $("#uv").text("UV-index : " + response[0].value);
  });
}     
```

## Important Links
[GitHub Repository](https://github.com/keekerr/Weather-Dashboard-Challenge)

[Deployed Application](https://keekerr.github.io/Weather-Dashboard-Challenge/)

![Image of Deployed Application](https://github.com/keekerr/Weather-Dashboard-Challenge/blob/main/assets/Weather%20Dashboard%20Sample.PNG?raw=true)

## Questions

If you have any questions regarding this project, please feel free to contact me at this email: keeley.s.sprouse@gmail.com

Other examples of projects I have worked on can be viewed on Github via this link: [keekerr](https://github.com/keekerr)
