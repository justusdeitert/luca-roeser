<form role="search" method="get" class="search-form row" action="{{ home_url('/') }}">
    <div class="col-auto">
        <input
            type="search"
            class="form-control"
            placeholder="{!! esc_attr_x('Search &hellip;', 'placeholder', 'sage') !!}"
            value="{{ get_search_query() }}"
            name="s"
        >
    </div>
    <div class="col-auto">
        <input type="submit" class="btn btn-primary" value="{{ esc_attr_x('Search', 'submit button', 'sage') }}">
    </div>
</form>
