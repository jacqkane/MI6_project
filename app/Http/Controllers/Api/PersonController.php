<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Person;
use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index(Request $request)
    {

        $status = $request->status;



        $people = Person::with('status')
            ->with('image')
            ->with('aliases')
            ->get();

        if ($status != '') {
            $people = Person::with('status')
                ->with('image')
                ->with('aliases')
                ->where('status_id', '=', $status)
                ->get();
        } else {

            $people = Person::with('status')
                ->with('image')
                ->with('aliases')
                ->get();
        }

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
