import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class UserLists extends Component {
  static propTypes = {
    userLists: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        is_admin: PropTypes.bool,
        createdAt: PropTypes.string,
        _id: PropTypes.string,
      }),
    ),
  };

  render() {
    const data = this.props.userLists;

    const UserItemLists = data.map(user => {
      return (
        <tr key={user._id} id={user._id}>
          <td>{user.email}</td>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
          <td>{user.is_admin ? 'True' : 'False'}</td>
        </tr>
      );
    });

    return UserItemLists;
  }
}
