# Raid-helper




## Description

We fetch data from raid-helper website's API containing information about World of Warcraft in-game event.
Data is processed and formated to be saved localy in .CSV format for later use in Excel sheets.
Information is used for tracking player attendance in the guild during certent period of time.

## How to use

### Setup
    - Install VSCode
    - Install Node.js

        - Open raid-helper folder with VSCode
        - In terminal window run `npm install`

### Run
    - In terminal window run `node app.js <raidID>`. Example: node app.js 12324124534535435234

    - This will create a file `attendance.csv`

    - Import data to Excel sheets. 