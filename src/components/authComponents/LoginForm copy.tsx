import Logo from "../Logo";

const LoginForm = () => {
  return (
    <div className='flex flex-col items-center mt-52'>
      <Logo />

      <h1 className='text-4xl font-black text-black mt-8'>
        Log in to your account
      </h1>
      <p className='text-base text-gray-600 mt-2'>
        Welcome coach! Please enter your details.
      </p>

      <form className="mt-8">
        <div className="relative border border-solid border-gray-300 rounded-xl">
          <div className="h-1/2 border-gray-300"></div>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 outline-none border-gray-300"
          />
          <input
            name="password"
            type="password"
            placeholder="●●●●●●●●"
            className="w-full px-4 py-2 outline-none border-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-xl mt-4 w-full"
        >
          Login
        </button>
      </form>

      <p className='text-blue-700 text-sm mt-2'>Forgot password</p>
      <p className='text-gray-600 text-sm mt-2'>
        Not yet registered?{" "}
        <a href='./register' className='text-blue-700'>
          Register here
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
