<?php

// https://gist.github.com/fieldoffice/c4c6df69f61b21769c6e
// -------------------------------->

class Submenu_Wrap extends Walker_Nav_Menu {
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<div class='popper-wrapper'><div class='sub-menu'><ul class='sub-menu__inner'>\n";
    }

    function end_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "$indent</ul></div></div>\n";
    }
}
