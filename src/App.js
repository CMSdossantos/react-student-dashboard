import './App.css';
import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import mockData from './studentMockData.json';
import Studentpage from './components/Studentpage.js'

const welkOpdr = 'Welke opdracht of welk project lever je nu in?'
const hoeMoei = 'Hoe moeilijk vond je deze opdracht?'
const hoeLeuk = 'Hoe leuk vond je deze opdracht?'
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


const App = () => {
    // const [chartResults, setChartResults] = useState([])

    const studentRoutes = studentNames.map( name => {
        const dataByIndividual = mockData.filter(item => item['Wie ben je?'] === name);
        return <Route key={name} path={`/${name}`} element={<Studentpage subject={dataByIndividual} assignments={assignmentNames} />}  /> 
    })
    studentRoutes.push(<Route key="/" path="/" element={<Studentpage subject={averageResults} assignments={assignmentNames} />}  />)

    const studentLinks =  studentNames.map( name =>
            <li>
            <Link key={name} to={"/" + name} > {name} </Link>
            </li>
            )

return <div>
        <nav><ul>
            {studentLinks}
        </ul></nav>
        <Routes>
            {studentRoutes}
        </Routes>    
</div>
}

export default App; 

