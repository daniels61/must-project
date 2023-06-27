import React, { useEffect, useState } from "react";
import axios from "axios";
import CardPost from "../components/CardPost";

const PostPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    const url = "/posts";
    axios.get(url)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postItems = posts.map((post) => (
    <CardPost
      key={post.id}
      id={post.id}
      description={post.body}
      img={post.img}
      title={post.title}
      published={post.formatted_created_at}
    />
  ));

  return <div>{postItems}</div>;
};

export default PostPage;

//list for all posts.
// const lst = [
//   {id: 1, title:'Blog post 1#' ,description: 'My first blog post is all about me, and how to write a new post in my blog.',publlished: '1 day ago', img: process.env.PUBLIC_URL + '/picture/Profile.png' ,extand:'Wolfgang Amadeus Mozart (1756-1791) was one of the most influential, popular and prolific composers of the classical period. He composed over 600 works, including some of the most famous and loved pieces of symphonic, chamber, operatic, and choral music. Mozart was born in Salzburg to a musical family. From an early age, the young Mozart showed all the signs of a prodigious musical talent. By the age of 5 he could read and write music, and he would entertain people with his talents on the keyboard. By the age of 6 he was writing his first compositions. Mozart was generally considered to be a rare musical genius, though Mozart said that he was diligent in studying other great composers such as Haydn and Bach.',  },
//   {id: 2, title:'Blog post 2#' ,description: 'My second blog post is all about my blog post.',publlished: '2 day ago', img: process.env.PUBLIC_URL +'/picture/aboutme.jpg' ,extand:'Wolfgang Amadeus Mozart (1756-1791) was one of the most influential, popular and prolific composers of the classical period. He composed over 600 works, including some of the most famous and loved pieces of symphonic, chamber, operatic, and choral music. Mozart was born in Salzburg to a musical family. From an early age, the young Mozart showed all the signs of a prodigious musical talent. By the age of 5 he could read and write music, and he would entertain people with his talents on the keyboard. By the age of 6 he was writing his first compositions. Mozart was generally considered to be a rare musical genius, though Mozart said that he was diligent in studying other great composers such as Haydn and Bach.',  },
//   {id: 3, title:'Blog post 3#' ,description: 'My Third blog post is all about me, and how to write a new post in my blog.',publlished: '3 day ago', img: process.env.PUBLIC_URL +'/picture/contact.jpg' ,extand:'Wolfgang Amadeus Mozart (1756-1791) was one of the most influential, popular and prolific composers of the classical period. He composed over 600 works, including some of the most famous and loved pieces of symphonic, chamber, operatic, and choral music. Mozart was born in Salzburg to a musical family. From an early age, the young Mozart showed all the signs of a prodigious musical talent. By the age of 5 he could read and write music, and he would entertain people with his talents on the keyboard. By the age of 6 he was writing his first compositions. Mozart was generally considered to be a rare musical genius, though Mozart said that he was diligent in studying other great composers such as Haydn and Bach.',  },
 
// ]


// const PostPage = () => {
//   const posts = lst.map((item) => 
//   <CardPost 
//     key={item.id}
//     id={item.id} 
//     description={item.description} 
//     img={item.img} title={item.title} 
//     publlished={item.publlished}/>)

//   return <div>
//     {posts}       
//     </div>;
// };




// export default PostPage;