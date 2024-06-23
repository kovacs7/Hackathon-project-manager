const Faqs = () => {
  return (
    <>
      <div className="space-y-4 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mb-8 sm:mb-12" id="faqs">
        <h2 className="text-3xl font-bold sm:text-4xl mb-8 text-center">
          FAQs
        </h2>
        <details
          className="group border-s-4 border-indigo-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
          open
        >
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 sm:text-2xl">
              What can I do with the chat feature in Aspire?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 text-md sm:text-lg">
            Aspire offers both group chat and direct messaging capabilities.
            Group chat allows your team to discuss ideas, share files, and
            collaborate in real-time. Direct messaging enables private
            conversations for confidential discussions or quick updates between
            team members.
          </p>
        </details>

        <details className="group border-s-4 border-indigo-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 sm:text-2xl">
              How does the task management feature in Aspire benefit my
              hackathon team?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 text-md sm:text-lg">
            Aspire{"'"}s task management feature helps you stay organized by
            allowing you to create, assign, and track tasks effortlessly. It
            ensures everyone knows their responsibilities, monitors progress,
            and facilitates seamless collaboration, ultimately enhancing
            productivity and project efficiency.
          </p>
        </details>

        <details className="group border-s-4 border-indigo-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5">
            <h2 className="text-lg font-medium text-gray-900 sm:text-2xl">
              What is the advantage of using the canvas for real-time
              collaboration in Aspire?
            </h2>

            <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p className="mt-4 leading-relaxed text-gray-700 text-md sm:text-lg">
            The canvas feature in Aspire provides a virtual space where team
            members can collaborate in real-time on brainstorming, planning, or
            designing tasks. It supports simultaneous editing and sharing of
            ideas visually, fostering creativity, and accelerating
            decision-making processes during your hackathon projects.
          </p>
        </details>
      </div>
    </>
  );
};

export default Faqs;
