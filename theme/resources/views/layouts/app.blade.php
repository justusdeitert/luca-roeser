@include('partials.navigation')

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
