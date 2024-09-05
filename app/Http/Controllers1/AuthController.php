<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request){
      
        $data = $request->validate([
            'name' =>'required|string',
            'email' =>'required|email|string|unique:users,email',
            'password' =>[
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        $user = User::create([
            'name'  =>   $data['name'],
            'email' =>  $data['email'],
            'password' => bcrypt(($data['password']))
        ]);

        $token = $user->createToken('min')->plainTextToken;
        
        return response([
            'user' => $user,
            'token' => $token,
        ]);

    }

    public function login(Request $request){
      
       $credentials = array(
            'uID' => $request->uID,
            'password' =>$request->password
            );
            
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        if (Auth::loginUsingId($credentials)) {

           
            $user = Auth::user();
            
         //   $user = CustomUser::user();

            $token = $user->createToken('main')->plainTextToken; 
          
            return response([
                'user' => $user,
                'token' => $token
            ]);

           // return response()->json(['message' => 'Login successful'], 200);
        }else{
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
       
  
    }

    public function logout( ){
         /**@var User $user */
         
        $user = Auth::user();
     
         return response()->json($user);
       $user->currentAccessToken()->delete(); 
        return response([
            'success' =>true
        ]);
    }

}