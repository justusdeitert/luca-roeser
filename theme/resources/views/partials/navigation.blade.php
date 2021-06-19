<?php

    $menu_item_separator = get_theme_mod('custom_menu_item_separator');
    $menu_has_opening_hours = get_theme_mod('custom_menu_has_opening_hours');
    $custom_menu_mobile_only = get_theme_mod('custom_mobile_menu_only');
    $custom_navbar_order = get_theme_mod('custom_navbar_order');

    $navbar_height = get_theme_mod('custom_navbar_height');
    $navbar_top_position = get_theme_mod('custom_navbar_top_position');
    $navbar_logo = get_theme_mod('custom_navbar_logo_image');
    $navbar_logo_alt = get_post_meta($navbar_logo['id'], '_wp_attachment_image_alt', true);
    $navbar_has_full_width = get_theme_mod('custom_full_width_navbar');

    /**
     * Custom Navbar Classes
     */
    $navbar_classes = [
        'navbar',
        $navbar_top_position == 0 ? 'set-to-top' : ''
    ];

    function get_item_spacing_classes($item) {

        $custom_item_spacing = get_theme_mod('custom_navbar_' . $item . '_spacing');

        if (in_array('left', $custom_item_spacing) && in_array('right', $custom_item_spacing)) {
            return 'ms-auto me-auto';
        }

        if (in_array('left', $custom_item_spacing)) {
            return 'ms-auto';
        }

        if (in_array('right', $custom_item_spacing)) {
            return 'me-auto';
        }

        return '';
    }
?>

<?php if ($menu_item_separator !== 'none') { ?>
    <style>
        .navbar .navbar__menu > .menu-item:after {
            content: '<?php echo $menu_item_separator; ?>';
        }

        .navbar .navbar__menu > .menu-item:last-child:after {
            display: none;
        }
    </style>
<?php } ?>

<nav class="{!! implode(' ', $navbar_classes); !!}">
    <div class="@if($navbar_has_full_width) {!! 'container-fluid' !!} @else {!! 'container' !!} @endif">
        <div class="navbar__inner">

            {{-- Define Menu Item Order --}}
            @foreach($custom_navbar_order as $custom_navbar_item)

                @if($custom_navbar_item === 'logo')
                    @if($navbar_logo['url'])
                        <div class="navbar__logo-wrapper {!! get_item_spacing_classes('logo') !!}">
                            <img src="{!! $navbar_logo['url'] !!}" alt="{!! $navbar_logo_alt !!}">
                        </div>
                    @endif
                @endif

                @if($custom_navbar_item === 'business_hours')
                    @if($menu_has_opening_hours)
                        <div class="navbar__business-hours {!! get_item_spacing_classes('business_hours') !!}">
                            @if($navbar_height >= 50)
                                <span class="navbar__business-hours__headline">
                                    {{ __('Business hours', 'sage') }}
                                </span>
                            @endif
                            <div class="navbar__business-hours__wrapper @if($is_open) is-open @endif">
                                <span>{{ $is_open ? __('Now open', 'sage') : __('Now closed', 'sage') }}</span>
                                <i class="icon-caret-down ms-1"></i>
                            </div>

                            {!! $business_hours_template; !!}
                        </div>
                    @endif
                @endif

                @if($custom_navbar_item === 'primary_menu')
                    @if(!$custom_menu_mobile_only)
                        @if (has_nav_menu('primary_desktop_menu'))
                            {!! wp_nav_menu([
                                'theme_location' => 'primary_desktop_menu',
                                'menu_class' => 'navbar__menu navbar__primary-desktop-menu d-none d-md-flex ' . get_item_spacing_classes('primary_menu'),
                                'container' => false,
                                'echo' => false
                            ]) !!}
                        @endif
                    @endif
                @endif

                @if($custom_navbar_item === 'secondary_menu')
                    @if(!$custom_menu_mobile_only)
                        @if (has_nav_menu('secondary_desktop_menu'))
                            {!! wp_nav_menu([
                                'theme_location' => 'secondary_desktop_menu',
                                'menu_class' => 'navbar__menu navbar__secondary-desktop-menu d-none d-md-flex ' . get_item_spacing_classes('secondary_menu'),
                                'container' => false,
                                'echo' => false
                            ]) !!}
                        @endif
                    @endif
                @endif

                @if($custom_navbar_item === 'burger_menu_icon')
                    <div class="{!! implode(' ', [
                        'navbar__burger-menu-icon-wrapper d-flex',
                        !$custom_menu_mobile_only ? 'd-md-none' : '',
                        get_item_spacing_classes('burger_menu_icon')
                    ]) !!}">
                        <i class="navbar__burger-menu-icon icon-menu"></i>
                        @if (has_nav_menu('primary_mobile_menu'))
                            {!! wp_nav_menu([
                                 'theme_location' => 'primary_mobile_menu',
                                 'menu_class' => ' navbar__primary-mobile-menu',
                                 'container' => false,
                                 'echo' => false
                            ]) !!}
                        @endif
                    </div>
                @endif
            @endforeach
        </div>
    </div>
</nav>
