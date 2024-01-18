import React, { Fragment, useEffect } from 'react';
import AppBar from './AppBar';


const UseAppBar = ({ children }) => {

    useEffect(() => {
        const rootElement = document.getElementById('root');
        if (rootElement) rootElement.classList.add('with-app-bar')
        return () => {
            if (rootElement) rootElement.classList.remove('with-app-bar')
        }
    }, []);


    return <Fragment>
        <AppBar />
        {children}
    </Fragment>
};


export default UseAppBar;