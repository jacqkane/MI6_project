<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::with('status')
            ->with('image')
            ->with('aliases')
            ->limit(20)
            ->get();

        return compact('people');
    }

    public function show($person_id)
    {
        $person = Person::with([
            'image',
            'status',
            'aliases'
        ])->findOrFail($person_id);

        return compact('person');
    }
}
