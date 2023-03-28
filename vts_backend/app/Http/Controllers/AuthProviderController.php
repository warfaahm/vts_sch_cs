<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreProviderRequest;
use App\Http\Requests\StoreProviderRequest1;
use App\Http\Resources\ProviderResource;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthProviderController extends Controller
{
    use HttpResponses;

    public function register(StoreProviderRequest $request)
    {
        $request->validated($request->all());

        $admin = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'hospital_id' => $request->hospital_id,
            'role' => $request->role,
        ]);

        return $this->success([
            'user' => $admin,
            'message' => 'Admin added successfully!',
        ]);
    }

    public function registerProvider(StoreProviderRequest1 $request)
    {
        $request->validated($request->all());

        $provider = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'hospital_id' => Auth::user()->hospital_id,
        ]);

        return $this->success([
            'user' => $provider,
            'message' => 'Provider - added successfully!',
        ]);
    }

    public function indexProvider()
    {
        // $data = Healthcare_provider::where('hospital_id', Auth::user()->hospital_id)->orderBy('name')->get();

        $data = ProviderResource::collection(
            User::where('hospital_id', Auth::user()->hospital_id)->orderBy('first_name')->get()
        );

        return $this->success($data);
    }

    public function index()
    {
        // $data = Healthcare_provider::where('role', 'admin')->get();

        $data = ProviderResource::collection(
            User::where('role', 'staff_admin')->orderBy('first_name')->get()
        );

        return $this->success($data);
    }

    public function showProvider(User $provider)
    {
        if (Auth::user()->hospital_id !== $provider->hospital_id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $data = new ProviderResource($provider);
        return $this->success($data);
    }

    public function show(User $provider)
    {
        if ($provider->role !== 'staff_admin')
        {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $data = new ProviderResource($provider);
        return $this->success($data);
    }

    public function destroy(User $provider)
    {
        if (Auth::user()->hospital_id !== $provider->hospital_id && $provider->role == 'staff_admin' && Auth::user()->id == $provider->id){
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $provider->delete();
        return $this->success('', 'Delete Successful');
    }

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::guard('web')->attempt(['email' => request('email'), 'password' => request('password')])){
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();

        if ($user->role !== 'staff' && $user->role !== 'staff_admin')
        {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        return $this->success([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You has successfully logged out',

        ]);
    }
}
