import './App.css';
import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory';
import { Link, Routes, Route } from 'react-router-dom';
import mockData from './studentMockData.json';
import Studentpage from './components/Studentpage.js'

const welkOpdr = 'Welke opdracht of welk project lever je nu in?'
const hoeMoei = 'Hoe moeilijk vond je deze opdracht?'
const hoeLeuk = 'Hoe leuk vond je deze opdracht?'
let chartResults = []
let averageResults = []

const studentNames = [...new Set(mockData.map(item => item['Wie ben je?']))]
const assignmentNames = [...new Set(mockData.map(obj => obj[welkOpdr] ))] //gathering an Array of assignmentNames

assignmentNames.forEach( name => { //fetching all ratings and calculate averages to push to averageResults
    const alleMoei = mockData.filter(item => item[welkOpdr] === name).map(ele => ele[hoeMoei])
    const alleLeuk = mockData.filter(item => item[welkOpdr] === name).map(ele => ele[hoeLeuk])
    const calcAverageM = alleMoei.reduce((acc, curr) => acc + curr ) / alleMoei.length
    const calcAverageL = alleLeuk.reduce((acc, curr) => acc + curr ) / alleLeuk.length
    let newObj = {
        [welkOpdr]: name,
        [hoeMoei]: calcAverageM, [hoeLeuk]: calcAverageL}   
    averageResults.push(newObj)
    
})

// console.log(averageResults);

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

    const studentRoutes = studentNames.map( name => {
        const dataByIndividual = mockData.filter(item => item['Wie ben je?'] === name);
        return <Route key={name} path={`/${name}`} element={<Studentpage subject={dataByIndividual} assignments={assignmentNames} />}  /> 
    })
    studentRoutes.push(<Route key="/" path="/" element={<Studentpage subject={averageResults} assignments={assignmentNames} />}  />)

    const studentLinks =  studentNames.map( name => 
        <Link key={name} to={"/" + name}> {name} </Link>
        )

return <div>
        <nav>
            {studentLinks}
        </nav>
        <div className='scaling'>
            <Routes>
            {studentRoutes}
            </Routes>

            <VictoryChart  domain={{x: [1 ,58], y: [0,5]}} domainPadding={{x: [5,5]}} theme={VictoryTheme.material} width={500} height={200} >
                <VictoryAxis 
                    tickValues={assignmentNames}
                    tickFormat={assignmentNames}
                    style={style}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`${x * 1}`)}
                />
                <VictoryGroup offset={2}> 
                    <VictoryBar data={averageResults} x={welkOpdr} y={hoeMoei} barRatio={2} />
                    <VictoryBar data={averageResults} x={welkOpdr} y={hoeLeuk} barRatio={2} /> 
                </VictoryGroup>
        
            </VictoryChart>
        </div> 
            {/* <Charts/> */}
</div>
}

export default App;    // x={assignment correspondeert niet in student zoals hier}

