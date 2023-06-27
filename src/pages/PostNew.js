import React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SendIcon from '@mui/icons-material/Send';


export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: [],
      resp: null
    };
  }

  getAllPosts = () => {
    const url = '/posts';
    axios.get(url)
      .then((res) => {
        this.setState({
          posts: res.data,
          resp: null
        });
      })

  }

  addPost = () => {
    const { title, body } = this.state;
    const url = '/posts';
    const data = {
      title: title,
      body: body
    };
    axios.post(url, data)
      .then((res) => {
        this.setState({
         data: [],
          resp: 'Success: Post added successfully.'
        });
        this.getAllPosts();
      })
      .catch((err) => {
        this.setState({
          resp: 'Error: Failed to add post.'
        });
      });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { title, body, posts, resp } = this.state;
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
           <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PostAddIcon/>
          </Avatar>
         <Typography component="h1" variant="h5">
            New post
          </Typography>
            <Box   component="form" onSubmit={this.addPost} noValidate sx={{ mt: 1 }}>

                {/* <input type="text" name="title" value={title} onChange={this.handleInputChange} placeholder="Post Title" />
                <br/> */}
                <TextField
                      value={title} 
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      label="Blog post #"
                      name="title"
                      defaultValue="Blog post #"
                      onChange={this.handleInputChange}
                    />
                {/* <input type="text" name="body" value={body} onChange={this.handleInputChange} placeholder="Post Body" />
                <br/> */}

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
                      onChange={this.handleInputChange}     
                    />

                <Button 
                    type="submit"
                    variant="contained"
                    fullWidth 
                    endIcon={<SendIcon />} sx={{ mt: 7, mb: 4 }} 
                    color="secondary"
                    >
                  Send post
                </Button>
                {/* <button onClick={this.addPost}>Add Post</button> */}

                <div>{resp ? resp : null}</div>


            </Box>
        </Box>
      </Container>
      {/* <button onClick={this.getAllPosts}>Get All Posts</button>
        <br/><br/><br/> */}
        <div>
                  {posts.map((post) => (
                    <div key={post.id}>
                      ID: {post.id}, Title: {post.title}, Body: {post.body}
                    </div>
                  ))}
                </div>
      </div>
    );
  }
}