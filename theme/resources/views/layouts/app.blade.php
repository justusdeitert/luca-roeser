<div class="container">

  <a class="sr-only sr-only-focusable" href="#main">
    {{ __('Skip to content') }}
  </a>

  @include('partials.header')

    <main class="main">
      @yield('content')
    </main>

    @hasSection('sidebar')
      <aside class="sidebar">
        @yield('sidebar')
      </aside>
    @endif

  @include('partials.footer')
</div>
