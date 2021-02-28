import React from "react";
import { Card, Heading, Paragraph, Pane } from "evergreen-ui";

const Home = ({ greeting }) => (

<Card
        elevation={3}
        margin="auto"
        background="white"
        textAlign="center"
        width={600}
  >
    <Pane  > <img src={"welcome.jpg"} 
   width="100%"  alt="Welcome!"/></Pane>
   <Pane padding={32}>
    <Heading size={900} > Welcome to your Blog Application</Heading>
    <Paragraph marginTop="default">{greeting}</Paragraph>
    </Pane>
  </Card>
);

export default Home;