import {
  Hourglass,
  LayoutList,
  Brush,
  MessageCircleCode,
  Video,
  Headset,
  HomeIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Logo2 from "../../assets/Logo2.svg";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

const AppMenu = () => {
  const navigate = useNavigate()
  const { projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const removeToken = () => {
    Cookies.remove("userToken");
    navigate("/")
  };

  return (
    <>
      <div className="flex h-initial w-16 flex-col justify-between border-e bg-white">
        <div>
          <div className="inline-flex size-16 items-center justify-center">
            <span className="grid size-10 place-content-center rounded-lg text-xs text-gray-600">
              <img src={Logo2} className="h-[30px] w-[30px]" />
            </span>
          </div>

          <div className="">
            <div className="px-2">
              <ul className="space-y-1 border-t border-gray-300 pt-4">
                <li>
                  <Link
                    to="/"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <HomeIcon size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Home
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/app-dashboard/${projectId}/tasks`}
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <LayoutList size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Tasks
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/app-dashboard/${projectId}/chats`}
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <MessageCircleCode size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Chats
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/app-dashboard/${projectId}/canvas`}
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Brush size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Canvas
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={`/app-dashboard/${projectId}/timeline`}
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Hourglass size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Timeline
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Headset size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Call Room
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <Video size={24} />

                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                      Video call
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-300 bg-white p-2">
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>

              <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-50 text-gray-700">
            <p className="text-xl font-medium leading-tight tracking-wide text-center">
              Do you want to Log Out?
            </p>
            <p className="flex-1 text-gray-600">
              Please leave a reveiw for us. 🥹{" "}
              <a
                href="#"
                rel="noopener noreferrer"
                className="font-light text-sm text-indigo-600"
              >
                feedback form.
              </a>
            </p>
            <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg bg-indigo-100">
                Cancel
              </button>
              <button onClick={removeToken} className="px-6 py-2 rounded-lg shadow-sm bg-indigo-500 text-gray-50">
                Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppMenu;
