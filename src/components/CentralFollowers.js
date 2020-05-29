import {gql, useQuery} from '@apollo/client';
import '../styles/CentralFollowers.css';
import React from 'react';

const FOLLOWERS = gql`
    query {
        viewer {
            followers(last: 100) {
                nodes {
                    login
                }
            }
        }
    }
`;

const CentralFollowers = (props) => {
    const {loading, data, error} = useQuery(FOLLOWERS);

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        console.log(error);
        return <div>Error :(</div>;
    }

    return (
        <div className="CentralFollowers">
            {data.viewer.followers.nodes.map(follower => {
                return <div>{follower.login}</div>
            })}
        </div>
    );
};

export default CentralFollowers;