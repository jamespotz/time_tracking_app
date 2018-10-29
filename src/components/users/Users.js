import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/userListActions';
import auth from '../../auth/authorization';
import UserLists from './UserLists';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      is_admin: '',
      _id: null,
      page: 0,
      limit: 10,
    };

    this.timeInterval = null;
  }

  componentDidMount() {
    if (!this.timeInterval) {
      this.timeInterval = setInterval(this.currentTime, 1000);
    }

    if (auth.signedIn()) {
      this.props.fetchUserLists({
        page: this.state.page,
        limit: this.state.limit,
      });
    }
  }

  render() {
    return (
      <div className="px-0 my-4 mt-32">
        <div className="flex flex-row justify-between px-4">
          <div className="panel panel-inverse" data-sortable-id="table-basic-1">
            <div className="panel-heading ui-sortable-handle">
              <h4 className="panel-title">User Lists</h4>
            </div>
            <div className="panel-body">
              <div className="table-responsive">
                <table className="table m-b-0">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>isAdmin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <UserLists userLists={this.props.userLists} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  userLists: state.userList.users,
});

export default withRouter(
  connect(
    mapStateToProps,
    actions,
  )(Users),
);
