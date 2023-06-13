import Logo from "../Logo";

const RegisterForm = () => {
  return (
    <div className="flex flex-col items-center mt-52">
      <Logo />

      <h1 className="text-4xl font-black text-black mt-8">
        Create an account
      </h1>
      <p className="text-base text-gray-600 mt-2">
        Welcome coach! Please fill in your details.
      </p>

      <form className="mt-8 w-64 lg:w-96">
        <div className="relative border border-solid border-gray-300 rounded-xl p-2">
          <div className="h-1/2 border-gray-300"></div>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 outline-none border-b border-solid border-gray-300"
          />
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 outline-none border-b border-solid border-gray-300"
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
          className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Register
        </button>
      </form>

      <p className="text-blue-700 text-sm mt-2">Forgot password</p>
      <p className="text-gray-600 text-sm mt-2">
        Already have an account?{" "}
        <a href="./login" className="text-blue-700">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
