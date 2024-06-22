import { useState } from "react";
import Logo2 from "../../assets/Logo2.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const userLogin = (e) => {
    e.preventDefault();
    axios
      .post("/login", data)
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        }
        if(res.data.success){
          toast.success(res.data.success);
          setData({
            email: "",
            password: "",
          });
          navigate("/");
        }
      })
      .catch(() =>
        toast.error("Error occured while connecting to the server.")
      );
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1599666432665-0150417654c5?q=80&w=2200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="mx-auto max-w-lg flex gap-4 flex-col">
              <Link className="block text-indigo-600" to="/">
                <span className="sr-only">Home</span>
                <img src={Logo2} className="h-[50px] w-[50px]" />
              </Link>
              <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                Welcome Back!
              </h1>

              <p className="mt-2 text-gray-500">
                We{"'"}re glad to see you again. Do leave a review for us 🥹.
              </p>
            </div>

            <form
              className="mx-auto mb-0 mt-8 max-w-lg space-y-4"
              onSubmit={userLogin}
            >
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <div className="relative">
                  <input
                    type="email"
                    className="w-full rounded-lg border border-gray-500 px-4 py-2 text-sm shadow-sm outline-none"
                    placeholder="Enter email"
                    value={data.email}
                    onChange={(e) => {
                      setData({ ...data, email: e.target.value });
                    }}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    className="w-full rounded-lg border border-gray-500 px-4 py-2 text-sm shadow-sm outline-none"
                    placeholder="Enter password"
                    value={data.password}
                    onChange={(e) => {
                      setData({ ...data, password: e.target.value });
                    }}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  No account?
                  <Link className="underline" to="/signup">
                    Sign up
                  </Link>
                </p>

                <button
                  type="submit"
                  className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white active:bg-white active:text-indigo-600 border active:border-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Login;
