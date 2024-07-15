/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blog";
import { makeStyles } from "@mui/styles";
import { lightTheme, darkTheme } from "../utils/theme";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "100vw",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    width: "100vw",
  },
  blogImage: {
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
    width: "100%",
  },
  editButton: {
    background: "#f0f0f0",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "14px",
  },
  deleteButton: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "red",
    cursor: "pointer",
  },
}));

const UserBlogs = () => {
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;
  const classes = useStyles();
  const [user, setUser] = useState();
  const [blogsget, setBlogs] = useState(false);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5001/api/blogs/user/${id}`)
      .catch((err) => console.log(err));
      let data = null;
      if(res.data){
        data = await res.data;
        console.log(res.data)
        if(res.data.user.blogs.length>0){
          setBlogs(true)
        }
      }
      else{
        setBlogs(false)
      }
    // console.log(res.data)
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  },[]);
  // console.log("user DAta:",user?.blogs[0].img)
  return (
    <div className={classes.container}style={{background:`${theme.bg}`}}>
      {blogsget?
      <>
        {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <div key={index} className={classes.blogContainer}>
          <Blogs
          id={blog._id}
          isUser={true}
          title={blog.title}
          description={blog.description}
          img={blog.img}
          video={blog.video}
          userName={user.name}
          />
          {/* <img
            className={classes.blogImage}
            src={blog.image}
            alt={blog.title}
            /> */}
            {/* <DeleteButton blogId={blog._id} onDelete={handleDelete} /> */}
            </div>
          ))}
          </>
          :
          <h1>No Blogs Found</h1>}
    </div>
  );
};

export default UserBlogs;
