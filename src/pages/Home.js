import PostPage from "./PostPage";
import Typography from '@mui/material/Typography';




const Home = () => {

  return <div>
     
     <Typography variant="h4" component="paragraph">
    Hello, Welcome to My blog
      </Typography>
    
    <PostPage/>
  </div>;
};

export default Home;