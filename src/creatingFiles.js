const fs = require('fs')
// import mockData from './studentMockData.json';
// this file/code is a one-time only run code. it makes components/files for me. (via nodeJS with FileSystem)
const mockData = require('./studentMockData.json')

const studentNames = [...new Set(mockData.map(item => item['Wie ben je?']))]

studentNames.forEach( (name) => {
    const content = `import React from 'react';

    const ${name} = () => {
        return (
            <div>
                <h3> this is ${name}'s page</h3>
            </div>
        );
    };
    
    export default ${name};`

    // fs.writeFile(`./components/${name}`, content)
    fs.writeFile(`./components/studentpages/${name}.js`, content, err => {
        if (err) throw err;
        console.log(`${name}.js has been saved!`);
      });
    // });
})