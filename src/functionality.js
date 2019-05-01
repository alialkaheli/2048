import React from 'react'
import BlockItem from './blockitem'
import './functionality.css'

export default class functionality extends React.Component {
    render() {
        const { gridData } = this.props
        //////not as important
        // const dimension = {
        //     height: `${4 * 100 + 4}px`,
        //     width: `${4 * 100 + 4}px`
        // }
        let boxes = []
        //mapping to each element in the array
        gridData.forEach((rowData, rIndex) => {
            boxes.push(
                rowData.map((data, cIndex) => {
                    return (
                        //each individual element will contain a color
                        //in the BlockItem class
                        //depending on the number 
                        <div key={`${rIndex}-${cIndex}`}>
                            <BlockItem id={`${rIndex}-${cIndex}`} data={data} />
                        </div>
                    )
                })
            )
        })
        return (
          //style={dimension}    add to the div below in the params
          <div className="Grid">{boxes}</div>
        );
    }
}