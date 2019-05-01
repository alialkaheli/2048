import React from 'react'
import './blockitem.css'

const styles = {
    extraSmall: {
        fontSize: '20px',
        backgroundColor: '#588D9C'
    },
    small: {
        fontSize: '30px',
        backgroundColor: '#FDA831'
    },
    medium: {
        fontSize: '35px',
        backgroundColor: "#ED8D8D"
    },
    large: {
        fontSize: '40px',
        backgroundColor: '#FFC97C'
    }
}
export default class blockItem extends React.Component {

    pickSize(data) {
        //if number is greater than or equal to 128 
        //then color dark orange
        if (data.toString().length > 2) {
            return styles.small
        }
        //if number is greater than or equal to 16 through 64 
        //color red
        if (data.toString().length > 1) {
            return styles.medium
        }
        //if the number is 2 then its light orange
        if (data >= 2) return styles.large
    }
    render() {
        const { data } = this.props
        const mStyle = this.pickSize(data)
        ///depending on the number the color is initialize for style
        //if data is greater than 0 then the number shows or else its empty
        return (<div className="Box" style={mStyle}>
        {data > 0 ? data : ''}
        </div>)
    }
}