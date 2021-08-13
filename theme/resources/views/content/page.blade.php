@if(!empty(get_the_content()))

    @php(the_content())
@else

    @include('partials.page-header')

    <x-alert type="warning">
        {!! __('Sorry, but the current page has no content yet.', 'sage') !!}
    </x-alert>

    @if(isset($post) && current_user_can('edit_post', $post->ID))
        <a class="btn btn-primary" href="{!! get_edit_post_link() !!}">{!! __('Edit', 'sage') !!}</a>
    @endif
@endif

