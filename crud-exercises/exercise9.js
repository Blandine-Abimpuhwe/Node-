// Question:
//  Write a Node.js script that reads the contents of a text file (input.txt) 
// and appends the current timestamp at the end of the file. 
// If the file does not exist, create it and write the current timestamp in it.

import fs from 'fs'

const timestamp = `\n${ new Date().toISOString()}`

    fs.appendFile('./input2.txt',timestamp,'utf8', (error)=>{
        
        if(error){
            console.log('Failed to update the file')
            return
        }
        console.log('file is read and the appending was a success')
        
    })
   
