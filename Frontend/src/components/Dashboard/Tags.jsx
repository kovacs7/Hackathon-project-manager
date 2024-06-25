import PropTypes from "prop-types";

const Tags = ({label, onRemove}) => {
  return (
    <>
      <>
        <div className="col-span-6">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
            <p className="whitespace-nowrap text-sm">{label}</p>

            <button
              className="-me-1 ms-1.5 inline-block rounded-full bg-emerald-200 p-0.5 text-emerald-700 transition hover:bg-emerald-300"
              onClick={() => {
                onRemove(label);
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
    </>
  );
};

Tags.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Tags;
