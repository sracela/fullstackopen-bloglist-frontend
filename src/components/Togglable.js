import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addTogglable, toggleVisibility } from "../reducers/togglableReducer";
import { Pane, Button, CrossIcon } from "evergreen-ui";

const Togglable = (props) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) =>
    state.togglables.find((a) => a.id === props.id)
  )?.visibility;
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  useEffect(() => {
    const onAddTogglable = () => dispatch(addTogglable(props.id));
    onAddTogglable();
  }, [dispatch, props.id]);

  return (
    <Pane position="relative" width="100%">
      <Pane style={hideWhenVisible}>
        <Button margin={8} onClick={() => dispatch(toggleVisibility(props.id))}>
          {props.buttonLabel}
        </Button>
      </Pane>
      <Pane style={showWhenVisible} className="togglableContent">
        <Pane position="absolute" width="100%" 
          margin={8}>
          {props.children}
        </Pane>
        <Button
          position="absolute"
          top="10%"
          left="0%"
          onClick={() => dispatch(toggleVisibility(props.id))}
          iconAfter={<CrossIcon />}
        >
          CLOSE
        </Button>
      </Pane>
    </Pane>
  );
};

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
