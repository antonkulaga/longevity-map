import React, { createRef, useState }  from 'react'

import './app.css';

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import {Menu, Divider, Header, Segment, MenuItemProps, Message} from 'semantic-ui-react';
import Database from "./Database"
import About from "./About";
import {isUndefined} from "mathjs";

export const App = () => {

    const [activeItem, setActiveItem] = useState<string>("Database")

    const handleItemClick = (event, data: MenuItemProps) =>  {
        if(!isUndefined(data.name)){
            setActiveItem(data.name)
        }
    }
    return (
        <Router>
                        <Menu color="blue" icon tabular>

                            <Menu.Item name="Database"
                                       active={activeItem === 'Database'}
                                       onClick={handleItemClick}
                            > <Link to="/">
                                <Header className="ui blue inverted compact segment">
                                    <i className="ui dragon icon"> </i>
                                    Database
                                </Header>
                            </Link>
                            </Menu.Item>
                            <Menu.Item name="About"
                                       active={activeItem === 'About'}
                                       onClick={handleItemClick}>
                                <Link to="/about">
                                <Header className="ui blue inverted compact segment">
                                    <i className="ui dragon icon"> </i>
                                    About
                                </Header>
                                </Link>
                            </Menu.Item>
                        </Menu>
            <Divider horizontal> </Divider>
                        <Segment color="blue">
                            <Routes>
                                <Route path="/" element={<Database/>} />
                                <Route path="/about" element={<About/>} />
                            </Routes>
                        </Segment>

        </Router>
    )
}
export default App