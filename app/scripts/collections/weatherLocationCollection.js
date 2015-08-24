/**
 * WeatherLocationCollection
 *
 * Access weather forecast for a particular location for 3/5 days in advance
 *
 * TODO:
 * - request weather location from the OpenWeatherMap API (documentation here: http://openweathermap.org/current)
 *
 */
define(['backbone', 'models/weatherLocationModel'], function(Backbone, WeatherLocationModel) {
    var openWeatherApiKey = 'c1dd1cf3dd68a9dedfa059420781c48c',
        openWeatherApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?';

    var WeatherLocationCollection = Backbone.Collection.extend({
        model: WeatherLocationModel,

        initialize: function(latlng) {
            this.latlng = 'lat=' + latlng.lat + '&lon=' + latlng.lng;
            this.apiKey = 'APPID=' + openWeatherApiKey;

            this.on('change', function() {});
        },

        parse: function(response) {
            console.log(response);
        },

        url: function() {
            return openWeatherApiUrl + this.latlng + '&units=' + this.get('temperatureUnit') + '&' + this.get('apiKey');
        }
    });

    return WeatherLocationCollection;
});

