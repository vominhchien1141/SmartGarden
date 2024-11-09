import React from 'react'
import Home from '../assets/icons/Home.svg'
import Bulb from '../assets/icons/Bulb.svg'
import Led from '../assets/icons/Led.svg'
import Dew from '../assets/icons/Dew.svg'

const SVGs = {
    Home,
    Bulb,
    Led,
    Dew,
}


export default {
    Icons: ({ name = "", width, height }) => {
        if (name in SVGs) {
            const Icons = SVGs[name]
            return <Icons width={width} height={height} />
        } else {
            return null;
        }
    }
}
