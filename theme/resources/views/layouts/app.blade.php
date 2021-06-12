@include('partials.navigation')


<?php

// $time_zone = 'Europe/Berlin';
// $time_language = 'de_DE';
// $current_date = new DateTime('now', new DateTimeZone($time_zone));
// $current_time = $current_date->format('H:i');
// $current_day = strtolower($current_date->format('l'));
// $opening_hours = array_filter(get_field('opening_hours', 'option')); // Clean array when days are empty
// $is_open = false;
//
// foreach ($opening_hours as $day => $times) {
//     setlocale(LC_TIME, $time_language);
//     $day_format = new DateTime($day, new DateTimeZone($time_zone));
//     $day_format = $day_format->format('Y-m-d');
//     $day_format = strftime("%a", strtotime($day_format));
//
//     echo '<span class="day">' . $day_format . '</span>';
//
//     foreach ($times as $time) {
//
//         if ($day === $current_day) {
//             if ($current_time > $time['from'] && $current_time < $time['to']) {
//                 echo '<span class="current-time">' . $time['from'] . ' - ' . $time['to'] . '</span>';
//                 $is_open = true;
//             } else {
//                 echo '<span>' . $time['from'] . ' - ' . $time['to'] . '</span>';
//             }
//         } else {
//             echo '<span>' . $time['from'] . ' - ' . $time['to'] . '</span>';
//         }
//     }
// }

?>

<main class="main">
    <div class="container">
        @yield('content')
    </div>
</main>

@hasSection('sidebar')
    <aside class="sidebar">
        @yield('sidebar')
    </aside>
@endif

@include('partials.footer')
