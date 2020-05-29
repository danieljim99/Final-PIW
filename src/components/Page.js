import CentralCreateRepo from './CentralCreateRepo';
import CentralFollowers from './CentralFollowers';
import {gql, useQuery} from '@apollo/client';
import React, {useState} from 'react';
import RightSide from './RightSide';
import LeftSide from './LeftSide';
import Central from './Central';
import '../styles/Page.css';

const TEST_TOKEN = gql`
    query {
        viewer {
            name
        }
    }
`;

const Page = (props) => {
    const [central, setCentral] = useState(<Central />);

    const centralSwitchHandler = (mode) => {
        switch(mode) {
            case 0:
                setCentral(<Central />);
                break;
            case 1:
                setCentral(<CentralFollowers />);
                break;
            case 2:
                setCentral(<CentralCreateRepo setCentralMode={centralSwitchHandler}/>);
                break;
            default:
                setCentral(<Central />);
        }
    };

    const {error} = useQuery(TEST_TOKEN);

    if(error) {
        console.log(error);
        return (
            <div className="AuthError">
                Error on Authenticate
                <a href="https://github.com/settings/tokens">Create new token</a>
                <button onClick={() => props.reAuth()}>Back</button>
            </div>
        );
    }

    return (
        <div className="Page">
            <LeftSide setCentralMode={centralSwitchHandler}/>
            {central}
            <RightSide setCentralMode={centralSwitchHandler}/>
        </div>
    );
};

export default Page;