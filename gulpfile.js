var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix
    	/* Vendor CSS */
    	.styles('vendor/*', 'public/assets/css/vendor.css')

    	/* Shared SCSS */
    	.sass('shared/shared.scss', 'public/assets/css/shared.css')

    	/* Vendor JS */
    	.scriptsIn('public/assets/libs', 'public/assets/js/vendor.js')

    	/* Shared Scripts */
    	.scriptsIn('public/app/shared', 'public/assets/js/shared.js')
});
