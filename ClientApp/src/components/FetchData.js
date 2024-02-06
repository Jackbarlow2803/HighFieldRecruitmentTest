import React, { Component } from 'react';

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
    }

    componentDidMount() {
        this.populateUserData();
    }

    static renderUsersTable(users) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>DOB + 20</th>
                        <th>Favourite colour</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.doB}</td>
                            <td>{calculateAgePlusTwenty(user.doB)}</td>
                            <td>{user.favouriteColour}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        const { users, loading } = this.state;

        return (
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    FetchData.renderUsersTable(users)
                )}
            </div>
        );
    }

    populateUserData() {
        fetch('userdata')
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data, loading: false });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                this.setState({ loading: false });
            });
    }

}
function calculateAgePlusTwenty(doB) {
    const dob = new Date(doB);
    const now = new Date();
    const age = Math.floor((now - dob) / (365 * 24 * 60 * 60 * 1000));
    return age + 20;
}
