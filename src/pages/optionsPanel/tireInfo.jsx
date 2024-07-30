import React from 'react'
import { ForkliftWith4Tires } from './truckTiresGraphics/forkliftWith4Tires';

export function TireInfo(){
    return(
        <div className='option-item'>
            <h4>Neumaticos Info</h4>
            <ForkliftWith4Tires />
        </div>
    )
}