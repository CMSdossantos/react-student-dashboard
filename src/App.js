import './App.css';
import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryGroup} from 'victory';
import Charts from './components/Charts.js';
import mockData from './studentMockData.json';

//wat heb ik nodig: alle fun en diff ratings, aantal van beiden.
//hoemoei en Hoeleuk moeten in victoryBar verandert worden naar een Array dat eerder verwerkt is.
//Verwerking: een arrayMethod die alle ratings (2x) verzamelt en gemiddelde uitkomst heeft per assignment.
const welkOpdr = 'Welke opdracht of welk project lever je nu in?'
const hoeMoei = 'Hoe moeilijk vond je deze opdracht?'
const hoeLeuk = 'Hoe leuk vond je deze opdracht?'
const assignmentNames = []
const titles = []
const allAverageRatingM = []
const allAverageRatingL = []
let chartResults = []

mockData.forEach((ele,idx) => {
    if(!assignmentNames.some(e => e.name === ele[welkOpdr]) &&  idx < 70 ){
        assignmentNames.push({name: ele[welkOpdr]})
        chartResults.push({name: ele[welkOpdr]})
    }
})
// console.log(chartResults);

assignmentNames.forEach( (opdracht, idx ) => { //voor elke opdracht in de lijst
    let alleMoei = []
    let alleLeuk = []
    
    mockData.forEach( (ele) => {
        if(opdracht.name === ele[welkOpdr]){ //Als deze Element in Mockdata dezelfde opdracht heeft (voor elke "scrum")
            //voeg rating aan array averagemoei/leuk.
            //als er geen averagerating is push deze in de array.
            if(!alleMoei[idx]){ alleMoei.push(ele[hoeMoei]) }
            else { alleMoei[idx] = ele[hoeMoei] };
            if(!alleLeuk[idx]){ alleLeuk.push(ele[hoeLeuk]) }
            else { alleLeuk[idx] = ele[hoeLeuk] }
            
            // console.log(`${alleMoei[idx]} += ${ele[hoeMoei]}  en av typeof${typeof alleMoei[idx]} ..${opdracht}`);
            // console.log(opdracht.name);
            
        }
    })
    assignmentNames[idx].averageRatingM =  alleMoei.reduce( (acc,curr) => acc + curr , 0) / alleMoei.length 
    assignmentNames[idx].averageRatingL = alleLeuk.reduce( (acc,curr) => acc + curr , 0) / alleLeuk.length
    
})
// console.log(chartResults);
// console.log(alleMoei);
// console.log(averageRatingL);
// console.log(mockData);
console.log(assignmentNames);

const data = [
    {name: 'SCRUM', avarageRatingL: '1', averageRatingM: '1'},
    {name: 'SCRUM', avarageRatingL: '1', averageRatingM: '1'},
    {name: 'SCRUM', avarageRatingL: '1', averageRatingM: '1'}
  ]; 
const evelyn = mockData.map( (ele) => ele['Wie ben je?'] === 'Evelyn'? true : false)


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
        <VictoryChart  domain={{x: [1 ,57]}} domainPadding={{x: [5,0]}} theme={VictoryTheme.material} width={500} height={200} >
            <VictoryAxis 
                tickValues={assignmentNames}
                tickFormat={assignmentNames.name}
                style={style}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`#${x * 10}k`)}
                
            />
            <VictoryGroup offset={5}> 
                <VictoryBar data={assignmentNames} x={"name"} y={"averageRatingM"} barRatio={1} />
                <VictoryBar data={assignmentNames} x={"name"} y={"averageRatingL"} barRatio={1} /> 
            </VictoryGroup>
        
        </VictoryChart>
        <Charts/>

        
    </div> 
}

export default App;

