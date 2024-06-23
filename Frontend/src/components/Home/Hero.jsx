const Hero = () => {
  return (
    <>
      <section className="relative bg-[url(https://mlh.io/assets/pages/guides/hacking-header-8d9ee01d33a4efa66523b2db6a45e96e.jpg)] bg-cover bg-center bg-no-repeat mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 sm:rounded-md">
        <div className="absolute inset-0 sm:bg-transparent"></div>

        <div className="relative backdrop-blur-md p-4 rounded-md w-[100%] sm:w-[50%]">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl text-gray-200 font-extrabold sm:text-5xl">
              Streamline your hackathon journey -
              <strong className="block font-extrabold text-indigo-400">
                {" "}
                Plan, collaborate, and innovate{" "}
              </strong>
              effortlessly with
              <strong className="block font-extrabold text-indigo-400">
                {" "}
                Aspire!{" "}
              </strong>
            </h1>

            <p className="text-gray-100 mt-4 max-w-lg sm:text-xl/relaxed">
              Aspire is your ultimate tool for organizing and managing hackathon
              projects. Simplify team collaboration, track progress, and ensure
              seamless execution from start to finish.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="/login"
                className="block w-full rounded bg-indigo-500 px-12 py-3 text-sm font-medium text-white shadow hover:rounded-xl focus:outline-none  active:bg-indigo-500 active:text-white sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#faqs"
                className="block w-full rounded bg-gray-100 px-12 py-3 text-sm font-medium text-indigo-500 shadow  focus:outline-none  active:bg-gray-100 active:text-indigo-500 sm:w-auto hover:rounded-xl"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero