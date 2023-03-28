<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreAdminRequest;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthAdminController extends Controller
{
    use HttpResponses;

    public function register(StoreAdminRequest $request)
    {
        $request->validated($request->all());

        $admin = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return $this->success([
            'user' => $admin,
            'message' => 'Admin added successfully!',
        ]);
    }

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::guard('web')->attempt(['email' => request('email'), 'password' => request('password')])){
            return $this->error('', 'Credentials do not match', 401);
        }

        $admin = User::where('email', $request->email)->first();

        if ($admin->role !== 'admin' && $admin->role !== 'admin_official')
        {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        return $this->success([
            'user' => $admin,
            'token' => $admin->createToken('API Token of ' . $admin->first_name)->plainTextToken,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You has successfully logged out',
        ]);
    }

    public function index()
    {
        $admin = User::where('role', 'admin')->orWhere('role', 'admin_official')->get();
        return $this->success($admin);
    }

    public function show($id)
    {
        $admin = User::find($id);

        if ($admin->role !== 'admin' && $admin->role !== 'admin_official')
        {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        if (!$admin){
            return response()->json([
                'success' => false,
                'message' => 'Admin User not found',
            ], 404);
        }

        return $this->success($admin);
    }
}
