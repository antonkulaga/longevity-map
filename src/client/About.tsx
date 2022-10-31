/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
import React from 'react';
import {Message, Segment} from 'semantic-ui-react';


import './app.css';

export const About = () => {

    return (
        <Segment>
            <Message>#eef1f7
                <Message.Header>
                   About Page
                </Message.Header>
                <Message.Content>
                    Should tell what we do
                </Message.Content>
            </Message>
        </Segment>
    )
}

export default About