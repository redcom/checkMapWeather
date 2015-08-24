/**
 * FlickerPictureModel
 *
 * Access flicker api using a search string to retreive one picture
 *
 */
define(['backbone'], function(Backbone) {
    var flickerApiKey = '740c044005bb12c87cf802bfa931baf7',
        // ideally this should be broken into defaults object, making this url a param based
        flickerApiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&texvt=&per_page=1&page=1&format=json&extras=url_s&api_key=' + flickerApiKey;

    var FlickerPictureModel = Backbone.Model.extend({
        defaults: {
            lat: 0,
            lng: 0,
            radius: 30,
            pictureUrl: ''
        },

        initialize: function() {
            this.on('change', function() {
                // this should catch the flicker ajax response
                if (this.hasChanged('pictureUrl')) {
                    this.trigger('change:model');
                }
            });
        },

        // overwrite sync to consume jsonp response
        sync: function(method, model, options) {
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: model.url(),
                jsonp: 'jsonpCallback', // the api requires the jsonp callback name to be this exact name
                processData: false
            }, options);

            return $.ajax(params);
        },

        parse: function(response) {
            /*jshint -W069 */
            if (!response.photos || response.photos.photo.length<1) { // make sure there is a response from server
                return {
                    pictureUrl: 'images/cities/berlin.jpg'
                };
            }
            return {
                pictureUrl: response.photos.photo[0]['url_s']
            };
            /*jshint +W069 */
        },

        urlRoot: function() {
            return flickerApiUrl + '&lat=' + this.get('lat') + '&lon=' + this.get('lon') + '&jsoncallback=?';
        }
    });

    return FlickerPictureModel;
});

