import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { lightTheme, darkTheme } from "../utils/theme";
import { useSelector } from "react-redux";

const Blogs = () => {
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div style={{background:`${theme.bg}`}}>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            video={blog.video}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
