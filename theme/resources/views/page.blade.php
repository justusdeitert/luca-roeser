@extends('layouts.app')

@section('content')
    @while(have_posts())
        @php(the_post())
        {{--@include('partials.page-header')--}}
        @includeFirst(['content.page', 'content.default'])
    @endwhile
@endsection
