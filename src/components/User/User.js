import React from 'react';
import {useParams} from "react-router-dom";
 function User() {
     
    const {kisiId}=useParams();

    return (
        <div>
            User!!!   {kisiId}
        </div>
    )
}

export default User;














