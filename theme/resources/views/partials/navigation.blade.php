<?php
    $menu_logo = get_theme_mod('custom_menu_logo_image');
    $menu_logo_alt = get_post_meta($menu_logo['id'], '_wp_attachment_image_alt', true);
    $menu_item_separator = get_theme_mod('custom_menu_item_separator');
    $menu_is_transparent = get_theme_mod('custom_menu_is_transparent');
    $menu_has_opening_hours = get_theme_mod('custom_menu_has_opening_hours');
    $menu_height = get_theme_mod('custom_menu_height');
    // $menu_center_primary_nav = get_theme_mod('custom_menu_center_primary_nav');
    $custom_menu_mobile_on_desktop = get_theme_mod('custom_menu_mobile_on_desktop');

    $navigation_classes = [
        // $menu_center_primary_nav ? 'primary-is-centered' : '',
        $menu_is_transparent ? 'is-transparent' : ''
    ];

    $custom_menu_item_order = get_theme_mod('custom_menu_item_order');
?>

<?php if ($menu_item_separator !== 'none') { ?>
    <style>
        .navigation .navigation__desktop > .menu-item:after {
            content: '<?php echo $menu_item_separator; ?>';
        }

        .navigation .navigation__desktop > .menu-item:last-child:after {
            display: none;
        }
    </style>
<?php } ?>

<nav class="navigation {!! implode(' ', $navigation_classes); !!}">
    <div class="container">
        <div class="navigation__inner">

            {{-- Define Menu Item Order --}}
            @foreach($custom_menu_item_order as $custom_menu_item)

                @if($custom_menu_item === 'logo')
                    @if($menu_logo['url'])
                        <div class="navigation__logo-wrapper">
                            <img src="{!! $menu_logo['url'] !!}" alt="{!! $menu_logo_alt !!}">
                        </div>
                    @endif
                @endif

                @if($custom_menu_item === 'business_hours')
                    @if($menu_has_opening_hours)
                        <div class="navigation__business-hours">
                            @if($menu_height >= 50)
                                <span class="navigation__business-hours__headline">
                            {{ __('Business hours', 'sage') }}
                        </span>
                            @endif
                            <div class="navigation__business-hours__wrapper @if($is_open) is-open @endif">
                                <span>{{ $is_open ? __('Now open', 'sage') : __('Now closed', 'sage') }}</span>
                                <i class="icon-caret-down ms-1"></i>
                            </div>

                            {!! $business_hours_template; !!}
                        </div>
                    @endif
                @endif

                @if($custom_menu_item === 'primary_menu')
                    @if(!$custom_menu_mobile_on_desktop)
                        @if (has_nav_menu('primary_navigation_desktop'))
                            {!! wp_nav_menu([
                                'theme_location' => 'primary_navigation_desktop',
                                'menu_class' => 'navigation__desktop navigation__desktop--primary d-none d-md-flex',
                                'container' => false,
                                'echo' => false
                            ]) !!}
                        @endif
                    @endif
                @endif

                @if($custom_menu_item === 'secondary_menu')
                    @if(!$custom_menu_mobile_on_desktop)
                        @if (has_nav_menu('secondary_navigation_desktop'))
                            {!! wp_nav_menu([
                                'theme_location' => 'secondary_navigation_desktop',
                                'menu_class' => 'navigation__desktop navigation__desktop--secondary d-none d-md-flex',
                                'container' => false,
                                'echo' => false
                            ]) !!}
                        @endif
                    @endif
                @endif

            @endforeach

            {{-- Mobile Navigation --}}
            <div class="navigation__mobile__wrapper d-flex @if(!$custom_menu_mobile_on_desktop) d-md-none @endif">
                <i class="icon-menu"></i>
                @if (has_nav_menu('primary_navigation_mobile'))
                    {!! wp_nav_menu([
                         'theme_location' => 'primary_navigation_mobile',
                         'menu_class' => 'navigation__mobile navigation__mobile--primary',
                         'container' => false,
                         'echo' => false
                    ]) !!}
                @endif
            </div>
        </div>
    </div>
</nav>
