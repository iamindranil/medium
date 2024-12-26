import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import { useBlogs } from "../hooks";

const Blogs = () => {
    const {loading,blogs}=useBlogs();
    if(loading){
      return <div className="flex justify-center items-center h-screen w-screen">
        <Loader/>
        </div>
      
    }
  return (
    <div>
      <Appbar shouldPublish={true} />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {
            blogs.map((blog)=>
                <BlogCard authorName={blog.author.name===null?"Anonymous":blog.author.name} title={blog.title} content={blog.content} publishedDate={`${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`}
                id={blog.id}
                />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Blogs;
