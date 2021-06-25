@extends('layouts.app')

@section('content')
    @while(have_posts())
        @php(the_post())
        @includeFirst(['content.single-' . get_post_type(), 'content.single'])
    @endwhile
@endsection
