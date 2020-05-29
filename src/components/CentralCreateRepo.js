import {gql, useMutation} from '@apollo/client';
import '../styles/CentralCreateRepo.css';
import React, {useState} from 'react';

const CREATE_REPO = gql`
    mutation ($name: String!, $visibility: RepositoryVisibility!, $description: String) {
        createRepository(input: {name: $name, visibility: $visibility, description: $description}) {
            repository {
                name
            }
        }
    }
`;

const CentralCreateRepo = (props) => {
    const [fieldsError, setFieldsError] = useState(false);

    const [mutation] = useMutation(CREATE_REPO);

    const createRepoHandler = () => {
        const name = document.getElementById("nameInput").value;
        const visibility = document.getElementById("visibilitySelection").value;
        const description = document.getElementById("descriptionInput").value;

        if(name !== "") {
            mutation({
                variables: {
                    name: name,
                    visibility: visibility,
                    description: description
                }
            }).then(response => {
                console.log(response);
                props.setCentralMode(0);
            }).catch(error => {
                console.log(error);
                setFieldsError(true);
            });
        } else {
            setFieldsError(true);
        }
    };

    return (
        <div className="CentralCreateRepo">
            <input className="NameInput" type="text" id="nameInput" placeholder="Repository name"/>
            <select className="VisibilitySelection" id="visibilitySelection" name="Visibility">
                <option value="PRIVATE">Private</option>
                <option value="PUBLIC">Public</option>
                <option value="INTERNAL">Internal</option>
            </select>
            <textarea className="DescriptionInput" id="descriptionInput" placeholder="Description"/>
            <div className="CreateButton" onClick={() => createRepoHandler()}>
                Create
            </div>
            {fieldsError ? <div className="ErrorMessage">Error creating the repository</div> : null}
        </div>
    );
};

export default CentralCreateRepo;