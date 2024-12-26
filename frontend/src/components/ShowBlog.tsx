import Appbar from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

const ShowBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar shouldPublish={true}/>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className="col-span-8 ">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Post on 26th Dec</div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="mb-2 ml-3">
            Author
            </div>
            <div>
              <div className="flex">
                <div className="pt-0.5 px-3">
                <Avatar name={blog.author.name || "Anonymous"} />
                </div>
                <div>
                  <div className="text-xl font-bold">
                    {blog.author.name || "Annonymous"}
                  </div>
                  <div className="pt-2 text-slate-500">
                    Random catch phrase about the author's ability to grab the
                    user's attentions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBlog;
