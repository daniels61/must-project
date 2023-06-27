import axios from 'axios';


export const addComment = (postId, commentBody) => {
    const url = `/posts/${postId}`;
    const data = {
      commentBody: commentBody,
      postId
    }
    axios.post(url, data)
    .then((res) => {
     return res.data
    })
      .catch((err) => {
        return err
          });
  }
  // export const getComments = (postId) => {
  //   const url = `/posts/${postId}/comments`;
  //   const data = {
  //         postId,          
  //   }
  //   axios.get(url, data)
  //   .then((res) => {
  //    return res.data
  //   })
  //     .catch((err) => {
  //       return err
  //         });
  // }
  export const getComments = (postId) => {
    const url = `/posts/${postId}/comments`;
  
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        throw err;
      });
  };