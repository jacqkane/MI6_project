<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index()

    {
        // $missions = Mission::all();
        $missions = Mission::with('people')
            ->get();


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

    public function assignPerson(Request $request)
    {

        $mission_id = $request->input('missionId');
        $person_id = $request->input('personId');

        if ($person_id !== null & $mission_id !== null) {
            $mission = Mission::findOrFail($mission_id);
            $mission->people()->attach($person_id);
        }
        return [
            'status' => 'Person ' . $person_id . ' added to mission id ' . $mission_id
        ];
    }

    public function unassignPerson(Request $request)
    {
        $mission_id = $request->input('missionId');
        $person_id = $request->input('personId');

        if ($person_id !== null & $mission_id !== null) {
            $mission = Mission::findOrFail($mission_id);
            $mission->people()->detach($person_id);
        }


        return [
            'status' => 'Person ' . $person_id . ' removed from mission id ' . $mission_id
        ];
    }
}
