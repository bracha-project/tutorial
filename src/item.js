import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import NaturalDragAnimation from './NaturalDragAnimation';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  height: '100px',
  width: '100px',
  outline: 'none',
  // change background colour if dragging
  // background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class Item extends Component {
  render() {
    const { item, index, ...props } = this.props;

    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
      >
        {(provided, snapshot) => (
          <NaturalDragAnimation
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style,
            )}
            snapshot={snapshot}
            {...props}
          >
            {style => (
              <img
                src={require('./assets/img.jpg')}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
                alt='img'
              />
            )}
          </NaturalDragAnimation>
        )}
      </Draggable>
    );
  }
}

export default Item;
