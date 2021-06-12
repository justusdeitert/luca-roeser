<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;
use DateTime;
use DateTimeZone;

class BusinessHours extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'partials.navigation',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function override()
    {
        return [
            'is_open' => $this->is_open(),
            'business_hours_template' => $this->business_hours_template()
        ];
    }

    /**
     * Returns if Business is open
     * @return bool
     * @throws \Exception
     */
    public function is_open()
    {
        $current_date = new DateTime('now', new DateTimeZone(wp_timezone_string()));
        $current_time = $current_date->format('H:i');
        $current_day = strtolower($current_date->format('l'));
        $business_hours = get_field('business_hours', 'option'); // Clean array when days are empty
        $is_open = false;

        if($business_hours) {
            $business_hours_filtered = array_filter($business_hours); // Filter array in case some days are empty
            foreach ($business_hours_filtered as $day => $times) {
                foreach ($times as $time) {
                    if ($day === $current_day) {
                        if ($current_time > $time['from'] && $current_time < $time['to']) {
                            $is_open = true;
                        }
                    }
                }
            }
        }

        return $is_open;
    }

    /**
     * Returns the post title.
     *
     * @return string
     */
    public function business_hours_template()
    {
        $current_date = new DateTime('now', new DateTimeZone(wp_timezone_string()));
        $current_time = $current_date->format('H:i');
        $current_day = strtolower($current_date->format('l'));
        $opening_hours = array_filter(get_field('business_hours', 'option')); // Clean array when days are empty

        // Remove from Array if a time is missing
        foreach ($opening_hours as $day => $times) {
            if (count($times) < 2) {
                unset($opening_hours[$day]);
            }
        }

        ob_start(); ?>
            <div class="business-hours-template">
                <?php foreach ($opening_hours as $day => $times) { ?>
                    <div class="business-hours-template__wrapper">
                        <?php
                        setlocale(LC_TIME, get_locale());
                        $day_format = new DateTime($day, new DateTimeZone(wp_timezone_string()));
                        $day_format = $day_format->format('Y-m-d');
                        $day_format = strftime("%a", strtotime($day_format));
                        ?>

                        <span class="business-hours-template__day"><?php echo $day_format; ?></span>

                        <div class="business-hours-template__time-wrapper">
                            <?php foreach ($times as $time) { ?>
                                <?php
                                $time_is_active = false;
                                if ($day === $current_day) {
                                    if ($current_time > $time['from'] && $current_time < $time['to']) {
                                        $time_is_active = true;
                                    }
                                }
                                ?>
                                <span class="business-hours-template__time">
                                    <span class="<?php echo $time_is_active ? 'active' : ''; ?>">
                                        <?php echo $time['from']; ?> - <?php echo $time['to']; ?>
                                    </span>
                                </span>
                            <?php } ?>
                        </div>
                    </div>
                <?php } ?>
            </div>

        <?php return ob_get_clean();

    }
}
