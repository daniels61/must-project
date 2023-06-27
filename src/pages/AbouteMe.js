import React from "react";
import Typography from '@mui/material/Typography';


const AboutMe = () => {
  return <div>
    
    <Typography variant="h4" component="h4">
        About Me
      </Typography>
            <Typography variant="body1" gutterBottom>
        Welcome to my personal website! I'm a passionate individual with a keen interest in technology and web development.
        I have several years of experience in front-end development using modern JavaScript frameworks.
      </Typography>
      <Typography variant="body1" gutterBottom>
        I enjoy creating user-friendly and visually appealing interfaces that provide a seamless browsing experience.
        In my free time, I love to explore new technologies, contribute to open-source projects, and expand my skillset.
      </Typography>
      <Typography variant="body1" gutterBottom>
        On this website, you can find blog posts, and details about my professional experience.
        Feel free to get in touch with me via the contact form if you have any questions or collaboration opportunities.
      </Typography>
      
    </div>;
};

export default AboutMe;