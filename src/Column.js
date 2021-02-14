import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';

import Item from './item';

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightgrey' : 'lightgrey',
  padding: grid,
  width: 500,
});

class Column extends Component {
    static propTypes = {
      droppableId: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    };

    render() {
      const { droppableId, data, ...props } = this.props;

      return (
        <Droppable droppableId={droppableId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.props.data.map((item, index) => (
                <Item item={item} index={index} key={item.id} {...props} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    }
}

export default Column;
