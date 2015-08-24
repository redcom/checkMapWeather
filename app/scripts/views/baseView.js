/**
 * BaseView
 *
 * A very basic base view. Please feel free to enrich it.
 */
define(['backbone'], function(Backbone) {
    var BaseView = Backbone.View.extend({
        render: function(params) {
            params || (params = {});

            if (params.template) {
                this.$el.html(params.template);
            }
        }
    });

    return BaseView;
});

