<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mission;
use App\Models\Person;
use Illuminate\Http\Request;

class MissionController extends Controller
{
    public function index() :string
    {
        $missions = Mission::all();
        return response()->json($missions);
    }

    public function show($mission_id)
    {
        return Mission::with([
            'people',
        ])->findOrFail($mission_id)->toJson();
    }
}
