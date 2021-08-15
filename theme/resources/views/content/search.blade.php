<section @php(post_class('section-block alignfull'))>
    <div class="section-block__inner">
        <header>
            <h2 class="entry-title">
                <a href="{{ get_permalink() }}">
                    {!! $title !!}
                </a>
            </h2>

            @includeWhen(get_post_type() === 'post', 'partials/entry-meta')
        </header>

        <div class="entry-summary">
            <?php
            /**
             * Create excerpt from get_the_content
             * TODO: Create better page excerpts
             */
            $start = strpos(get_the_content(), '<p>');
            $end = strpos(get_the_content(), '</p>', $start);
            $paragraph = substr(get_the_content(), $start, $end - $start + 4);
            ?>

            {!! $paragraph !!}
        </div>
    </div>

</section>
