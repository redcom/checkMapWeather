/**
 * WeatherLocationModel
 *
 * Access weather forecast for a particular location
 *
 * TODO:
 * - request weather location from the OpenWeatherMap API (documentation here: http://openweathermap.org/current)
 * - you can use the provided API key
 *
 */
define(['backbone'], function(Backbone) {
    var openWeatherApiKey = 'c1dd1cf3dd68a9dedfa059420781c48c',
        openWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';

    var WeatherLocationModel = Backbone.Model.extend({
        defaults: {
            latlng: 'lat=0&lon=0',
            apiKey: 'APPID=' + openWeatherApiKey,
            place: '',
            weatherDesc: '',
            temperature: '',
            temperatureUnit: 'metric',
            weatherDate: ''
        },

        initialize: function() {
            this.on('change', function() {
                if (this.hasChanged('place')) {
                    this.trigger('change:model');
                }
            });
        },

        setCoords: function(latlng) {
            this.set({
                latlng: '&lat=' + latlng.lat + '&lon=' + latlng.lng
            });
        },

        parse: function(response) {
            return {
                place: response.name || response.sys.country,
                weatherDesc: response.weather[0].description,
                temperature: Math.ceil(response.main.temp),
                weatherDate: response.dt
            };
        },

        urlRoot: function() {
            return openWeatherApiUrl + this.get('latlng') + '&units=' + this.get('temperatureUnit') + '&' + this.get('apiKey');
        }
    });

    return WeatherLocationModel;
});

