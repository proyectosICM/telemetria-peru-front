import React from 'react'
import { ForkliftWith4Tires } from './../pages/optionsPanel/truckTiresGraphics/forkliftWith4Tires';


export function TireInfo(){
    return(
        <div className='g-option-item'>
            <h4>Neumaticos Info</h4>
            <ForkliftWith4Tires />
        </div> 
    )
}