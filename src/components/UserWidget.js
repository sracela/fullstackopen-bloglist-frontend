import React from "react";
import {
    Heading,
    Pane,
    Avatar,
    Text,
    Badge,
} from "evergreen-ui";

const UserWidget = ({ currentUser }) => {
    return (
      <Pane
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Avatar name={currentUser.name} size={120} />
        <Pane alignSelf="flex-start" marginLeft={16}>
          <Heading size={600} marginTop="default">
            {currentUser.name}
          </Heading>
          <Text color="muted">Lead Designer</Text>
          <Pane marginTop={8}>
            <Badge color="green">ONLINE</Badge>
          </Pane>
        </Pane>
      </Pane>
    );
}
export default UserWidget;