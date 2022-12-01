import './App.css';
import React from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack} from 'victory';
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
let alleMoei = []
let alleLeuk = []


mockData.forEach((ele,idx) => {
    if(!assignmentNames.includes(ele[welkOpdr]) &&  idx < 70 ){
        assignmentNames.push({name: ele[welkOpdr]})
        titles.push(ele[welkOpdr])
    }
})
// console.log(assignmentNames);

assignmentNames.forEach( (opdracht, idx ) => { //voor elke opdracht in de lijst
    
    mockData.forEach( (ele) => {
        if(opdracht.name === ele[welkOpdr]){ //Als deze Element in Mockdata dezelfde opdracht heeft
            //voeg rating aan array averagemoei/leuk.
            //als er geen averagerating is push deze in de array.
            if(!alleMoei[idx]){ alleMoei.push(ele[hoeMoei]) }
            else { alleMoei[idx] = ele[hoeMoei] };
            if(!alleLeuk[idx]){ alleLeuk.push(ele[hoeLeuk]) }
            else { alleLeuk[idx] = ele[hoeLeuk] }
            
            // console.log(`${alleMoei[idx]} += ${ele[hoeMoei]}  en av typeof${typeof alleMoei[idx]} ..${opdracht}`);
            // console.log(`${alleMoei} + ${idx}`);
            
            // let averageRatingM = alleMoei.reduce( (acc,curr) => acc + curr) / alleMoei.length
            // let averageRatingL = alleLeuk.reduce( (acc,curr) => acc + curr) / alleLeuk.length
        }
    })
    opdracht.averageRatingM = alleMoei.reduce( (acc,curr) => acc + curr) / alleMoei.length
    opdracht.averageRatingL = alleLeuk.reduce( (acc,curr) => acc + curr) / alleLeuk.length
})
console.log(assignmentNames);
// console.log(averageRatingM);
// console.log(averageRatingL);
// console.log(mockData);
// console.log(assignmentNames);


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
        <VictoryChart  domain={{x: [1 ,56]}} domainPadding={{x: [5,0]}} theme={VictoryTheme.material} width={500} height={200} >
            <VictoryAxis 
                tickValues={titles}
                tickFormat={titles}
                style={style}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`#${x *10}k`)}
            />
            <VictoryStack domain={{ y: [0,10]}}>
                <VictoryBar data={assignmentNames} x={titles} y={"averageRatingM"} barWidth={2} barRatio={2.0} alignment={"start"}/>
                <VictoryBar data={assignmentNames} x={titles} y={"averageRatingL"} barWidth={2} barRatio={2.0} alignment={"end"} />
            </VictoryStack>
        
        </VictoryChart>
        <Charts/>
        
    </div> 
}

export default App;

