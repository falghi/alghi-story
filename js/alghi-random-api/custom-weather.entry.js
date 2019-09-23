import { r as registerInstance, h } from './chunk-e4c3f803.js';

class BreakingNewsComponent {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.canGeolocation = true;
        this.doneGeolocation = 0;
        this.weatherForecast = [];
    }
    componentWillLoad() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geolocation => {
                fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=metric`, {
                    headers: {
                        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                        'X-RapidAPI-Key': '1bd45d7bffmsh6fdc929b409c600p1727fajsn2e0aec4c9e4c'
                    }
                }).then(resp => resp.json())
                    .then(weatherInfo => {
                    this.weatherInfo = weatherInfo;
                    ++this.doneGeolocation;
                });
                fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?lat=${geolocation.coords.latitude}&lon=${geolocation.coords.longitude}&units=metric`, {
                    headers: {
                        'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
                        'X-RapidAPI-Key': '1bd45d7bffmsh6fdc929b409c600p1727fajsn2e0aec4c9e4c'
                    }
                }).then(resp => resp.json())
                    .then(weatherForecast => {
                    weatherForecast.list.forEach(forecast => {
                        let newDt = new Date(0);
                        newDt.setUTCSeconds(forecast.dt);
                        this.weatherForecast.push(h("div", null, newDt.toString(), h("br", null), h("img", { class: "center-img", src: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`, alt: "weather icon" }), forecast.weather[0].main, " (", forecast.weather[0].description, ")", h("hr", null)));
                    });
                    ++this.doneGeolocation;
                });
            });
        }
        else {
            this.canGeolocation = false;
        }
    }
    render() {
        return (!this.canGeolocation ?
            h("h2", { style: { textAlign: 'center' } }, "Geolocation is not supported by this browser.")
            :
                this.doneGeolocation !== 2 ?
                    h("h2", { style: { textAlign: 'center' } }, "Loading...")
                    :
                        h("div", null, h("div", null, h("h2", null, this.weatherInfo.name), h("h5", { class: "little-space" }, "Country: ", this.weatherInfo.sys.country, h("br", null), "Longitude: ", this.weatherInfo.coord.lon, h("br", null), "Latitude: ", this.weatherInfo.coord.lat, h("br", null)), h("div", { class: "little-space" }, "Weather: ", this.weatherInfo.weather[0].main, " (", this.weatherInfo.weather[0].description, ")", h("br", null), "Temperature: ", this.weatherInfo.main.temp, "\u00B0C", h("br", null), "Pressure: ", this.weatherInfo.main.pressure, " Pa", h("br", null), "Humidity: ", this.weatherInfo.main.humidity, "%", h("br", null))), h("img", { src: `http://openweathermap.org/img/wn/${this.weatherInfo.weather[0].icon}@2x.png`, alt: "weather icon" }), h("h3", null, "Forecast:"), h("div", { class: "little-space" }, this.weatherForecast)));
    }
    static get style() { return ".little-space {\n    line-height: 1.5;\n}\n\n.center-img {\n    vertical-align: middle;\n}"; }
}

export { BreakingNewsComponent as custom_weather };
