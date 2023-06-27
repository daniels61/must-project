import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from "react-router-dom";
import { addComment, getComments } from "./apicalls";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';




export default function CardPostExtand(props) {
  
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    addComment(props.id, comment)
    console.log("Submitted comment:", comment);
    setComment("");
  };

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(props.id);
      setComments(fetchedComments);
    };
    fetchComments();
  }, [props.id]);

  return (
    
    <div style={{ display: '', justifyContent: 'center' }}>
      
      <Card sx={{
        maxWidth: 1000,
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        <CardMedia
          component="img"
          alt=""
          height="500"
          image={props.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {props.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {props.description}
          </Typography>
          <br></br>
          <Typography paragraph>
            {props.extand}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Published {props.publlished} by Israel
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button variant="contained" color="secondary">
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Back home
            </Link>
          </Button>
          <Button variant="contained" color="secondary">
            <Link to={`/posts/${props.id}/edit`} style={{ textDecoration: 'none', color: 'inherit' }}>
              Edit
            </Link>
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Comment form
          </Typography> 
           <Box   component="form" onSubmit={handleSubmitComment} noValidate sx={{ mt: 1 }}>
          <TextField
                      value={comment} 
                      type="text"
                      margin="normal"
                      required
                      fullWidth
                      id="comment"
                      label="Add a comment"
                      name="comment"
                      onChange={handleCommentChange}
                    />

              <Button type="submit" variant="contained" color="primary">
              Add Comment
            </Button>
         </Box>
      <Typography variant="h6" gutterBottom>
            <br/>
            Comments
      </Typography>
                
                {comments.length !== 0 ? (
                // Render existing comments
                comments.map((comment) => (
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                    <Typography variant="body2" key={comment.id}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="User" src="" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >          
                             </Typography>
                            {" - Thank you for your comment"}
                          </React.Fragment>
                        }
                         />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Typography>
                  </List>
                ))
              ) : (
                // Render a loading state or placeholder while comments are being fetched
                <Typography variant="body2">No comments...</Typography>
              )}

      
          {/* <form onSubmit={handleSubmitComment}>
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment"
              style={{ width: "100%", marginBottom: "8px" }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form> */}

       
        </CardContent>
      </Card>
      <br />
    </div>
  );
}
