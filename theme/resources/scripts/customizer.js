/**
 * This file allows you to add functionality to the Theme Customizer
 * live preview. jQuery is readily available.
 *
 * {@link https://codex.wordpress.org/Theme_Customization_API}
 */

/**
 * Change the blog name value.
 *
 * @param {string} value
 */
wp.customize('blogname', value => {
    value.bind(to => {
        // $('.brand').text(to)
        // TODO: No jQuery method
    });
});

/**
 * If you wanna use transport for you kirki customizer controls look here
 * @link https://kirki.org/docs/arguments/transport/
 * @link https://kirki.org/docs/modules/postmessage/
 */
