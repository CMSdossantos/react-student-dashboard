import './App.css';
import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup} from 'victory';
import Charts from './components/Charts.js';
import mockData from './studentMockData.json';


const welkOpdr = 'Welke opdracht of welk project lever je nu in?'
const hoeMoei = 'Hoe moeilijk vond je deze opdracht?'
const hoeLeuk = 'Hoe leuk vond je deze opdracht?'
let chartResults = [] 


const assignmentNames = [...new Set(mockData.map(obj => obj[welkOpdr] ))] //gathering an Array of assignmentNames

assignmentNames.forEach( name => { //fetching all ratings and calculate averages to push to chartResults
    const alleMoei = mockData.filter(item => item[welkOpdr] === name).map(ele => ele[hoeMoei])
    const alleLeuk = mockData.filter(item => item[welkOpdr] === name).map(ele => ele[hoeLeuk])
    const calcAverageM = alleMoei.reduce((acc, curr) => acc + curr ) / alleMoei.length
    const calcAverageL = alleLeuk.reduce((acc, curr) => acc + curr ) / alleLeuk.length
    let newObj = {assignment: name, averageRatingM: calcAverageM, averageRatingL: calcAverageL}   
    chartResults.push(newObj)
    
})

console.log(chartResults);


const style = {
    tickLabels: {
    fontSize: '3px',
    fontFamily: 'inherit',
    fillOpacity: 1,
    margin: 0,
    padding: 0,
    angle: 45,
    textAnchor: 'begin'
  }
}

const App = () => {
    return <div className='scaling'>
        <VictoryChart  domain={{x: [1 ,58], y: [0,5]}} domainPadding={{x: [5,5]}} theme={VictoryTheme.material} width={500} height={200} >
            <VictoryAxis 
                tickValues={assignmentNames}
                tickFormat={assignmentNames.name}
                style={style}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`${x * 1}`)}
                
            />
            <VictoryGroup offset={2}> 
                <VictoryBar data={chartResults} x={"assignment"} y={"averageRatingM"} barRatio={2} />
                <VictoryBar data={chartResults} x={"assignment"} y={"averageRatingL"} barRatio={2} /> 
            </VictoryGroup>
        
        </VictoryChart>
        <Charts/>
    </div> 
}

export default App;

