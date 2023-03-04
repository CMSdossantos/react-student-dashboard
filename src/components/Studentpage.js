import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryGroup } from 'victory';

// const welkOpdr = 'Welke opdracht of welk project lever je nu in?'
const hoeMoei = 'Hoe moeilijk vond je deze opdracht?'
const hoeLeuk = 'Hoe leuk vond je deze opdracht?'

const Studentpage = ({ subject, assignments }) =>  {
    // console.log(subject);

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

    
    
    return (
        <div>
            {/* <h2> {`${subject[1]["Wie ben je?"]}`} </h2> */}
            <div className='scaling'>
            <VictoryChart  domain={{x: [1 ,58], y: [0,5]}} domainPadding={{x: [5,5]}} theme={VictoryTheme.material} width={500} height={200}
             >
                <VictoryAxis 
                    tickValues={assignments}
                    tickFormat={assignments}
                    style={style}
                />
                <VictoryAxis
                    dependentAxis
                    // tickFormat specifies how ticks should be displayed
                    tickFormat={(x) => (`${x * 1}`)}
                />
                <VictoryGroup offset={2}> 
                    <VictoryBar data={subject} x={"Welke opdracht of welk project lever je nu in?"} y={hoeMoei} animate={{duration: 2000 }} />
                    <VictoryBar data={subject} x={"Welke opdracht of welk project lever je nu in?"} y={hoeLeuk} animate={{duration: 2000 }} /> 
                </VictoryGroup>
        
            </VictoryChart>
        </div>
        </div>
    );
}

export default Studentpage;