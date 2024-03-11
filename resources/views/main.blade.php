@extends('layouts.layout') 

@section('react-app')

    <div id="people-of-interest-app" class="app"></div>

    @viteReactRefresh
    @vite('resources/js/people_of_interest.jsx')
   

@endsection



