import React, { Component } from 'react';

export default class Frame extends Component {
  constructor(props){
    super(props);
    this.renderFrameContents = this.renderFrameContents.bind(this);
  }

  render () {
    return <iframe />;
  }
  componentDidMount () {
    this.renderFrameContents();
  }
  renderFrameContents () {
    var doc = this.props.DOMNode
    if (doc.readyState === 'complete') {
       React.renderComponent(this.props.children, doc.body);
    } else {
       setTimeout(this.renderFrameContents, 0);
    }
  }
  componentDidUpdate () {
    this.renderFrameContents();
  }
  componentWillUnmount () {
    React.unmountComponentAtNode(this.props.DOMNode.body);
  }
}