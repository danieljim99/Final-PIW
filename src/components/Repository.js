import {gql, useMutation} from '@apollo/client';
import React, {useState} from 'react';
import '../styles/Repository.css';

const ARCHIVE_REPO = gql`
    mutation ($repositoryId: ID!) {
        archiveRepository(input: {repositoryId: $repositoryId}) {
            repository {
                name
            }
        }
    }
`;

const Repository = (props) => {
    const [clicked, setClicked] = useState(false);

    const [mutation] = useMutation(ARCHIVE_REPO);

    const clickRepoHandler = () => {
        setClicked(!clicked);
    };

    const archiveRepoHandler = () => {
        mutation({
            variables: {
                repositoryId: props.repository.id
            }
        }).then(response => {
            console.log(response);
            setClicked(false);
        }).catch(error => {
            console.log(error);
        });
    };

    return (
        <div className="Repository" onClick={() => clickRepoHandler()}>
            <div className="RepoName">{props.repository.name}</div>
            {clicked ? <div className="ArchiveRepoButton" onClick={() => archiveRepoHandler()}>Archive Repository</div> : null}
        </div>
    );
};

export default Repository;