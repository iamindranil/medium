import { ChangeEvent, useState } from "react";
import Appbar from "../components/Appbar";
import { CreateBlogInput } from "@chakbindra/common-medium";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [blogInput, setBlogInput] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const navigate=useNavigate();
  async function sendRequestToAddBlog() {
    try {
      //backend call
      const response=await axios.post(`${BACKEND_URL}/api/v1/blog`,blogInput,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    }
);
      //toastify
      navigate(`/blog/${response.data.id}`)
      alert("Blog added successfully!");
    } catch (e) {
      alert("Error while posting a blog");
    }
  }

  return (
    <div>
      <Appbar shouldPublish={false} />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Your Title
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
            onChange={(e) => {
              setBlogInput({
                ...blogInput,
                title: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full">
          <div className="">
            <TextEditor onChange={(e)=>{
                setBlogInput({
                    ...blogInput,
                    content: e.target.value,
                  });
            }}/>
            <button
            onClick={sendRequestToAddBlog}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
            >
              Publish post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
  return (
    <form>
      <div className="w-full mb-4">
        <div className="flex items-center justify-between py-2 border-b ">
          <div className="py-2 bg-white rounded-b-lg  w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Your Content
            </label>
            <textarea
              onChange={onChange}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Publish;
