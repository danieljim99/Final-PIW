import {gql, useQuery} from '@apollo/client';
import Repository from './Repository';
import '../styles/RightSide.css';
import React from 'react';

const REPOS = gql`
    query {
        viewer {
            repositories (last: 10){
                nodes {
                    name
                    id
                }
            }
        }
    }
`;

const RightSide = (props) => {
    const {loading, data, error} = useQuery(REPOS);

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        console.log(error);
        return <div>Error :(</div>
    }

    return (
        <div className="RightSide">
            <ul>
                {data.viewer.repositories.nodes.map(repository => {
                    return <li key={repository.id}><Repository repository={repository}/></li>
                })}
            </ul>
        </div>
    );
};

export default RightSide;