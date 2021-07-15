@include('partials.navigation')

<main class="main container">
    @yield('content')
</main>

@hasSection('sidebar')
    <aside class="sidebar">
        @yield('sidebar')
    </aside>
@endif

@if(isset($post) && current_user_can( 'edit_post', $post->ID ))
    <a class="edit-post-link" href="{!! get_edit_post_link() !!}"><i class="icon-edit"></i></a>
@endif

@include('partials.footer')
