import React from 'react'
import { useState , useEffect } from 'react'
import { PostService } from '../service/PostService';

const News = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    PostService.getAllPost().then((res)=>{
      console.log("start get all post." , res.data._embedded.posts);
      setPosts(res.data._embedded.posts);
    }).catch((err)=>{
      console.error("get all post error." , err);
    });

  },[]);


  return (
    <div className='container'>
      <h3 className='mt-4'>最新消息</h3>
      <div className='row mt-5 justify-content-center'>
        {posts.map((post , index) => {
          return(
            <div key={index} className='card border-light mb-4' id='post_cards' style={{width:"50rem"}}>
              <img src={post.cover_img} alt="post_img" className='card-img-top' style={{maxHeight:"700px" , maxWidth:"700px"} } />
              <div className='card-body' >
                <h5 className='card-title'>{post.title}</h5>
                <p className='card-text'>{post.description}</p>
                <p>{post.create_time}</p>
              </div>
              <hr/>
            </div>
          )
          
        })}
      </div>
      
    </div>
  )
}

export default News