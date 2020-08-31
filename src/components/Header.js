import React, {useContext} from 'react';
import HeaderProvider from '../contexts/contextProviderHeader';
import {HeaderContext} from '../contexts/contextProviderHeader';

const Header = () => {

    const {user, setUser} = useContext(HeaderContext);
    let name = '';
    let points = '';

    if(user != null)
    {
      name = user.name;
      points = user.points;
    }
    console.log("userHeaderHeaders", user);
    
    return (
        <div className="top box">
            
            <div className="logo"></div>
            <div className="profile">
                <div className="namexUser">
                   {name}
                </div>
                <div className="points">
                    <div className="rectangle">
                        <div className="number">
                            {points}
                        </div>
                        <div className="money">
                        </div>
                    </div>    
                </div>

            </div>
        </div>
        
    );
}

export default Header;