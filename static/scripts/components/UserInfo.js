import React, { Component } from 'react';

export default class UserInfo extends Component {
  render () {
    return <div>
      {this.props.userInfo.username}
    </div>
  }
}