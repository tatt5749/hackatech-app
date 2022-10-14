import React from 'react';
import Root from './routes/Root';

import GlobalProvider from './contexts/Provider';


export default function Router(props) {  
    return (
        <GlobalProvider>
            
            <Root/>
           
        </GlobalProvider>
    );
}