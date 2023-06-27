import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SendIcon from '@mui/icons-material/Send';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    // Fetch the existing post data
    axios.get(`/posts/${id}`)
      .then(response => {
        const { title, body } = response.data;
        setTitle(title);
        setBody(body);
      })
      .catch(error => {
        console.log('Error retrieving post data:', error);
        setErrorMessage('Failed to fetch post data.');
      });
  }, [id]);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleBodyChange = event => {
    setBody(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();

    // Make the API request to update the post
    const session_id = document.cookie.replace(/(?:(?:^|.*;\s*)session_id\s*=([^;]*).*$)|^.*$/, '$1');

    axios.post(`/posts/${id}/edit`, {
      title,
      body,
      session_id
    })
      .then(response => {
        console.log('Post updated successfully:', response.data);
        // Perform any additional actions after successful update
      })
      .catch(error => {
        console.log('Error updating post:', error);
        setErrorMessage('Failed to update post.');
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="m">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
             <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ mt: 1 }}>
                <h2>Edit Post</h2>
                {errorMessage && <p>{errorMessage}</p>}
                <TextField
                      value={title} 
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      defaultValue="Blog post #"
                      onChange={handleTitleChange}
                    />
                {/* <form onSubmit={handleFormSubmit}> */}
                  {/* <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} />
                  </div> */}
                  
                  <TextField
                      margin="normal"
                      multiline
                      fullWidth
                      name="body"
                      label="Body of the post"
                      id="body"
                      rows={6}
                      defaultValue="Text Description" 
                      value={body}       
                      onChange={handleBodyChange}     
                    />
                  {/* <div>
                    <label>Body:</label>
                    <textarea value={body} onChange={handleBodyChange} />
                  </div> */}

                  <Button 
                    type="submit"
                    variant="contained"
                    fullWidth 
                    endIcon={<SendIcon />} sx={{ mt: 7, mb: 4 }} 
                    color="secondary"
                    >
                  Update post
                </Button>
                  {/* <button type="submit">Update Post</button> */}
                  <br/><br/>
                  <Button variant="contained" color="secondary">
                    <Link to={`/posts/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      Back to post
                    </Link>
                  </Button>
                {/* </form> */}
              </Box>
        </Box>
      </Container>
    </div>
  );
};

export default EditPost;

