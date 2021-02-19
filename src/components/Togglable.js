import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux";
import { addTogglable, toggleVisibility } from "../reducers/togglableReducer";

const Togglable = (props) => {
  const dispatch = useDispatch();
  const visible = useSelector((state) =>
    state.togglables.find((a) => a.id === props.id)
  )?.visibility;
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  useEffect(() => {
  const onAddTogglable = () => dispatch(addTogglable(props.id));
    onAddTogglable()
  }, [dispatch, props.id]);
  
  return (
    <div style={{ position: "relative", width: '100%'}}>
      <div style={hideWhenVisible}>
        <button onClick={() => dispatch(toggleVisibility(props.id))}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button
          onClick={() => dispatch(toggleVisibility(props.id))}
        >
          close
        </button>
      </div>
    </div>
  );
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable