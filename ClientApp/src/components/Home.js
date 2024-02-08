import React, { Component } from 'react';
import Chart from 'chart.js/auto';

export class Home extends Component {
    static displayName = Home.name;

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

    static rendercolourFrequencyTable(users) {
        const colourFrequency = {};
        users.forEach(user => {
            const colour = user.favouriteColour;
            colourFrequency[colour] = (colourFrequency[colour] || 0) + 1;
        });

        const sortedcolours = Object.keys(colourFrequency).sort((a, b) => {
            if (colourFrequency[a] === colourFrequency[b]) {
                return a.localeCompare(b);
            }
            return colourFrequency[b] - colourFrequency[a];
        });

        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Colour</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedcolours.map(colour => (
                        <tr key={colour}>
                            <td>{colour}</td>
                            <td>{colourFrequency[colour]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        const { users, loading } = this.state;

        return (
            <><div>
                <h1>Jack Barlow - Submission</h1>
                <p>This is my interpretation of the following assignment</p>
                <ul>
                    <li>Hit the following endpoint to get user data https://recruitment.highfieldqualifications.com/api/test</li>
                    <li>Calculate the following on the user set</li>
                    <ul>
                        <li>A list of each colour in the data set with the frequency of each colour, ordered by highest quantity then alphabetically</li>
                        <li>Every user's age plus 20 years</li>
                        <li>Display this information</li>
                    </ul>
                </ul>

            </div><div>
                    <div>
                        <h2>Original Table</h2>
                        {Home.renderUsersTable(users)}
                        <h2>Colour Frequency Table</h2>
                        {Home.rendercolourFrequencyTable(users)}
                    </div>
                </div></>
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
