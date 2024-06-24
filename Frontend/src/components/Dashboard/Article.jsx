import { LayoutList, MessageCircleCode, Brush, Hourglass, Headset, Video } from "lucide-react";

const Article = () => {
  return (
    <>
      <div
        className="group relative inline-block text-sm font-medium text-indigo-300 focus:outline-none  active:text-indigo-700 bg-indigo-400 rounded-md"
        href="#"
      >
        <span className="absolute inset-0 border-2 border-indigo-400 rounded-md"></span>
        <span className="block transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2 rounded-md">
          <div className="flex flex-1 flex-row justify-between">
            <div className="relative overflow-hidden rounded-md border border-indigo-300 bg-white hover:shadow-xl ">
              <div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="relative block overflow-hidden p-4 sm:p-6 lg:p-8">
                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl line-clamp-2">
                          Building a SaaS product as a software developer
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-600 line-clamp-1">
                          Created by Jackie Chan {Date()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-600">
                        Snippet
                      </span>

                      <span className="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs text-emerald-600">
                        JavaScript
                      </span>
                    </div>

                    <div className="mt-4">
                      <p className="text-pretty text-sm text-gray-500 line-clamp-3">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. At velit illum provident a, ipsa maiores deleniti
                        consectetur nobis et eaque. Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. At velit illum provident
                        a, ipsa maiores deleniti consectetur nobis et eaque.
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      <button className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <LayoutList size={16} />
                        Tasks
                      </button>

                      <button className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <MessageCircleCode size={16} />
                        Chats
                      </button>

                      <button className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <Brush size={16} />
                        Canvas
                      </button>

                      <button className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <Hourglass size={16} />
                        Timeline
                      </button>

                      <button className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <Headset size={16} />
                        Call
                      </button>

                      <button className="whitespace-nowrap rounded-md bg-purple-100 px-2.5 py-0.5 text-sm text-purple-600 flex justify-center items-center gap-1">
                        <Video size={16}/>
                        Video call
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Article;
