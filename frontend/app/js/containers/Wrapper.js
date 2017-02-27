import React from 'react';
import Header from '../components/general/Header';
const Wrapper = (props) => (
    <div>
        <Header/>
        {props.children}
    </div>
);

export default Wrapper;