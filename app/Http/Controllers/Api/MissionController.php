<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()

    {
        $missions = Mission::all();
        return compact('missions');
        // return json_encode(Mission::all()->toJson());
    }

    public function show(int $id): string
    {
        return Mission::with('people')->findOrFail($id)->toJson();
    }

    public function update(Request $request, $mission_id)
    {
    
        $mission = Mission::findOrFail($mission_id);

        $mission->name = $request->input('name') ?? $mission->name;
        $mission->outcome = $request->input('outcome') ?? $mission->outcome;
        $mission->year = $request->input('year') ?? $mission->year;
        $mission->save();


        return [
            'status' => 'success'
        ];
    }
}