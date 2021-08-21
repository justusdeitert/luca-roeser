<?php

// use Carbon_Fields\Container;
// use Carbon_Fields\Field;
//
// add_action( 'carbon_fields_register_fields', 'crb_attach_theme_options' );
// function crb_attach_theme_options() {
//     Container::make( 'theme_options', __( 'Theme Options' ) )
//         ->add_fields( array(
//             Field::make( 'text', 'crb_text', 'Text Field' ),
//         ) );
// }
//
// add_action( 'after_setup_theme', 'crb_load' );
// function crb_load() {
//     require_once( 'vendor/autoload.php' );
//     \Carbon_Fields\Carbon_Fields::boot();
// }

//
// namespace App;
//
// use Carbon_Fields\Container;
// use Carbon_Fields\Field;
//
// /**
//  * Define custom fields
//  * Docs: https://carbonfields.net/docs/
//  */
// add_action('carbon_fields_register_fields', function () {
//     // Your fields will go here.
//
//     // Container::make('theme_options', __('Theme Options', 'sage'))
//     //     ->set_page_parent('options-general.php')
//     //     ->add_fields([
//     //         Field::make('text', 'crb_text', 'Text Field'),
//     //         Field::make('date_time', 'eta', __('Estimated time of arrival', 'sage')),
//     //         // Create image field with name "customer_photo" and label "Photo"
//     //         Field::make( 'image', 'crb_customer_photo', 'Photo' )
//     //     ]);
//
//     Container::make('theme_options', __('Theme Options'))
//         ->add_fields([
//             Field::make('text', 'crb_facebook_url', __('Facebook URL')),
//             Field::make('textarea', 'crb_footer_text', __('Footer Text'))
//         ]);
//
//     Container::make( 'nav_menu_item', __( 'Menu Settings' ) )
//         ->add_fields( array(
//             Field::make( 'color', 'crb_color', __( 'Color' ) ),
//         ));
//
// });
//
// /**
//  * Boot Carbon Fields
//  */
// add_action('after_setup_theme', function () {
//     \Carbon_Fields\Carbon_Fields::boot();
// });
//
//
//
