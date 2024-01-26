import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import Welcomemessage from "./Welcomemessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
   const {postList,addInitaialPosts} = useContext(PostListData);

  const [fetching, setFetching]=useState(false);


   useEffect(() => {
    setFetching(true);
    fetch('https://dummyjson.com/posts')
     .then(res => res.json())
     .then(data => {
      addInitaialPosts(data.posts);
      setFetching(false)
   });
   }, []);

return (
 <>
 {fetching &&<LoadingSpinner/>}
  {
    !fetching && postList.length === 0 && <Welcomemessage/>
  }
   {!fetching && postList.map((post) => (
   <Post key={post.id} post={post}/>))}
   
  </>
  );
};
export default PostList;