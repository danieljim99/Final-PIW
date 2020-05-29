import {gql, useQuery} from '@apollo/client';
import '../styles/LeftSide.css';
import React from 'react';

const VIEWER = gql`
    query {
        viewer {
            name
            login
            email
            followers(last: 100) {
                totalCount
            }
        }
    }
`;

const LeftSide = (props) => {
    const clickFollowersHandler = () => {
        props.setCentralMode(1);
    };

    const createRepoButtonHandler = () => {
        props.setCentralMode(2);
    };

    const {loading, data, error} = useQuery(VIEWER);

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        console.log(error);
        return <div>Error :(</div>
    }

    return (
        <div className="LeftSide">
            {data.viewer.name ? <div><b>Name:</b> {data.viewer.name}</div> : null}
            <div><b>Username:</b> {data.viewer.login}</div>
            <div><b>Email:</b> {data.viewer.email}</div>
            <div className="Followers" onClick={() => clickFollowersHandler()}><b>Followers:</b> {data.viewer.followers.totalCount}</div>
            <div className="CreateRepositoryButton" onClick={() => createRepoButtonHandler()}>Create Repository</div>
        </div>
    );
};

export default LeftSide;