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
}
