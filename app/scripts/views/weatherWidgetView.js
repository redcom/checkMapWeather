/**
 * WeatherWidgetView
 *
 * Display weather forecast for a specific location.
 *
 * Initially there's a basic Jade template and an empty WeatherLocationModel.
 *
 * TODO:
 * - fill up view with real data coming from the OpenWeatherMap API
 * - request a background image from the Flickr API (or anything else you find good)
 * - add a vectoriel weather icon
 * - expand the widget with some weather forecast
 *
 */
define([
    'views/baseView',
    'templates/weatherWidget',
    'models/weatherLocationModel',
    'models/flickerPictureModel',
    'collections/weatherLocationCollection',
    'moment'
], function(
    BaseView,
    weatherWidgetTemplate,
    WeatherLocationModel,
    FlickerPictureModel,
    WeatherLocationCollection,
    moment
) {
    var WeatherWidgetView = BaseView.extend({
        attributes: {
            id: 'weatherWidget'
        },
        model: new WeatherLocationModel(),
        templateData: null,
        flickerModel: null,

        initialize: function(params) {
            this.latlng = params.latlng;
            this.model.on('change:model', function() {
                this.templateData = this.model.toJSON();
                this.templateData.weatherDate = moment(this.templateData.weatherDate * 1000).format('dddd, MMMM DD, hh:mm');
                this.getFlickerPicture(this.latlng);
            }, this);
            this.model.setCoords(this.latlng);
            this.model.fetch();
        },

        events: {
            'click .temperature': 'clickOnTemperature'
        },

        render: function() {
            BaseView.prototype.render.call(this, {
                template: weatherWidgetTemplate({
                    weather: this.templateData,
                    background: this.flickerModel.toJSON()
                })
            });
        },

        clickOnTemperature: function clickOnTemperature() {
            console.log('clickOnTemperature');
            var collection = new WeatherLocationCollection(this.latlng);
            collection.fetch();
        },

        getFlickerPicture: function(latlng) {
            this.flickerModel = new FlickerPictureModel({
                lat: latlng.lat,
                lon: latlng.lng
            });

            this.flickerModel.fetch();

            this.flickerModel.on('change:model', function() {
                this.render();
            }, this);
        }
    });

    return WeatherWidgetView;
});

