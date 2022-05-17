import React from 'react'
import Recepies from './Recepies';
import Summary from './Summary';

export const Layout = () => {
    return (
        <div>
            <Summary/>
            <Recepies/>
        </div>
    )
}

export default Layout;
