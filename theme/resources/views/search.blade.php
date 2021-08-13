@extends('layouts.app')

@section('content')
    <div class="page-wrapper">
        @include('partials.page-header')

        @if (! have_posts())
            <x-alert type="warning">
                {!! __('Sorry, no results were found.', 'sage') !!}
            </x-alert>

            {!! get_search_form(false) !!}
        @endif

        @while(have_posts())
            @php(the_post())
            @if(get_the_content())
                @include('content.search')
            @endif
        @endwhile

        {!! get_the_posts_navigation() !!}
    </div>
@endsection
