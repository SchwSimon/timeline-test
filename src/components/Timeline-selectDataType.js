import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeDataType } from '../actions/timeline-actions';

const mapStateToProps = state => ({
  dataTypes: state.timeline.dataTypes,
  selectedDataType: state.timeline.selectedDataType,
});

const mapActionsToProps = {
  changeDataType: changeDataType
};

  // the <select/> options for the data types
let dataTypeOptions;

export class TimelineSelectDataType extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.dataTypes !== this.props.dataTypes) {
      dataTypeOptions = nextProps.dataTypes
        ? nextProps.dataTypes.map((type, index) => (
            <option
              key={index}
              value={type}
              defaultValue={nextProps.selectedDataType}
            >{type}</option>
          ))
        : null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.dataTypes.length !== this.props.dataTypes.length)
      return true;
    return false;
  }

  onChange(event) {
    this.props.changeDataType(event.target.value);
  }

  render() {
    return (
      <select onChange={this.onChange}>
        {dataTypeOptions}
      </select>
    );
  }
}

TimelineSelectDataType.PropTypes = {
  dataTypes: PropTypes.arrayOf(PropTypes.string),
  selectedDataType: PropTypes.string
};

export default connect(mapStateToProps, mapActionsToProps)(TimelineSelectDataType);
