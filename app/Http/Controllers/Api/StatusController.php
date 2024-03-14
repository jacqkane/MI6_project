<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function index()
    {
        $statuses = Status::all();

        return compact('statuses');
    }
}