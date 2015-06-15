<?php
/**
 * Jetpack Compatibility File
 * See: https://jetpack.me/
 *
 * @package Seepolls
 */

/**
 * Add theme support for Infinite Scroll.
 * See: https://jetpack.me/support/infinite-scroll/
 */
function seepolls_jetpack_setup() {
	add_theme_support( 'infinite-scroll', array(
		'container' => 'main',
		'render'    => 'seepolls_infinite_scroll_render',
		'footer'    => 'page',
	) );
} // end function seepolls_jetpack_setup
add_action( 'after_setup_theme', 'seepolls_jetpack_setup' );

function seepolls_infinite_scroll_render() {
	while ( have_posts() ) {
		the_post();
		get_template_part( 'template-parts/content', get_post_format() );
	}
} // end function seepolls_infinite_scroll_render