import PropTypes from "prop-types";

const Badges = ({ user, fn }) => {
  return (
    <>
      <div className="col-span-6">
        <span className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
          <p className="whitespace-nowrap text-sm">{user.username}</p>

          <button
            className="-me-1 ms-1.5 inline-block rounded-full bg-purple-200 p-0.5 text-purple-700 transition hover:bg-purple-300"
            onClick={() => {
              fn(user._id);
            }}
          >
            <span className="sr-only">Remove badge</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-3 w-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      </div>
    </>
  );
};

Badges.propTypes = {
  user: PropTypes.object.isRequired,
  fn: PropTypes.func.isRequired,
};

export default Badges;
