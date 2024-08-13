
const fs = require('fs');
const path = require('path');

// Dynamicly import node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const raidId = process.argv[2];

const fetchData = async () => {
  try {
    // Fetch data for a specific in-game raid from raid-helper website
    const response = await fetch(`https://raid-helper.dev/api/v2/events/${raidId}`);

    // Check the response
    if (!response.ok) {
      throw new Error(`Error with HTTP! ${response.status}`);
    }
    // Convert response from JSON
    const data = await response.json();
    
    // Get specific data about signed up player
    const signUps = data.signUps.map(player => {

        // Deconstructing each player object
        const { className: className, name } = player;
        const { entryTime } = player;

        // Returns array with required data
        return [
            name,
            [
                'Absence',
                'Bench',
                'Late',
                'Tentative',
            ].includes(className)
                ? className
                : 'On Time',
                toISOString(entryTime),
                1 // One is attendance indicator needed for later use in Excel  
        // Formatting output
        ].map(x => `"${x}"`) 
            .join(',');;
    }).join('\n');

    // Create a file path and save the file in root directory
    const file = path.join(process.cwd(), 'attendance.csv');

    fs.writeFile(file, signUps, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Successfuly written!');
        }
    });

  } catch (error) {
    console.error('Error in fetchData', error);
  }
};

fetchData();


// Require specific output format in order to work for everyone (taken from another project)
function toISOString(timestamp) {
  const date = new Date(timestamp * 1000);
  const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
  return date.getFullYear()
        + '-'
        + pad(date.getMonth() + 1)
        + '-'
        + pad(date.getDate());
};

// Format player name
function capitalize (name) {
  if (name.length === 0 ) return '';

  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

};

