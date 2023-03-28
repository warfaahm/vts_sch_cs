<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StorePatientRequest;
use App\Models\Patient;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthPatientController extends Controller
{
    use HttpResponses;

    public function register(StorePatientRequest $request)
    {
        $request->validated($request->all());

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'role' => 'patient',
            'password' => Hash::make($request->password),
        ]);

        $id = $user->id;

        $patient = Patient::create([
            'user_id' => $id,
            'nat_id_no' => $request->nat_id_no,
            'gender' => $request->gender,
            'dob' => $request->dob,
            'phone_no' => $request->phone_no,
            'allergy' => $request->allergy,
        ]);
        return $this->success([
            'user' => $user,
            'patient' => $patient,
            // 'token' => $user->createToken('API Token of ' . $user->first_name)->plainTextToken,
        ]);

    }

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::guard('web')->attempt(['email' => request('email'), 'password' => request('password')])){
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();

        if ($user->role !== 'patient')
        {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        return $this->success([
            'user' => $user,
            'patient' => $user->patient,
            'token' => $user->createToken('API Token of ' . $user->first_name)->plainTextToken,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You has successfully logged out',

        ]);
    }

    public function profile()
    {
        $data = User::where('id', Auth::user()->id);

        return response()->json([
            'success' => true,
            'data' => $data,
            'patient' => $data->patient,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $data = Patient::where('user_id', Auth::user()->id);
        $data->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Profile Update Successfully',
            'data' => $data,
        ]);
    }
}
