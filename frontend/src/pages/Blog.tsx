import { useParams } from "react-router-dom";
// import BlogCard from "../components/BlogCard";
import { useBlog } from "../hooks"
import ShowBlog from "../components/ShowBlog";
import Loader from "../components/Loader";

const Blog = () => {
  const {id}=useParams();
  const {loading,blog}=useBlog({
    id:id||""
  });
  if(loading){
    return <div className="flex justify-center items-center h-screen w-screen">
      <Loader/>
      </div>
    
  }
  // return (
  //   <div>
  //     {blog &&
  //       <BlogCard authorName={blog.author.name===null?"Anonymous":blog.author.name} title={blog.title} content={blog.content} publishedDate={"25-12-2024"} id={blog.id}/>
  //     } 
  //   </div>
  // )
  return <div>
    {blog &&
    <ShowBlog blog={blog}/>
    }
    </div>
}

export default Blog
