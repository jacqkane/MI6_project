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
            ->get();

        return compact('people');
        // return response()->json($people);
        // return $people;
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
