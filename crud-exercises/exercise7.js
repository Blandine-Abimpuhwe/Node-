//  Write a Node.js script that reads the contents of a large text file (input.txt) using streams 
// and converts all the text to uppercase.
//  The script should then write the transformed content to a new file (output.txt).
//  Ensure that the script handles any potential errors during reading or writing.

import fs from 'fs'
import { createReadStream, createWriteStream } from "fs";
import { Transform } from 'stream';


 let reader = fs.createReadStream('./input.txt','utf8')
 let writer= fs.createWriteStream('./output2.txt')

 let upperCaseTransformer= new Transform({
  transform(chunk, encoding, callback){
  callback(null,chunk.toString().toUpperCase())
  }
 })

//Handling errors
 reader.on('error', (error)=>{
    console.log('reader error:', error.message)
 })
writer.on('error', (error)=>{
    console.log('writer error:',error.message)
 })
 upperCaseTransformer.on('error', (error)=>{
    console.log('upperCaseTransformer error:', error.message)
 })

 //completion event
 writer.on('finish', ()=>console.log('file successfully read and written'))
 //CONNECT BOTH STREAMS
 reader.pipe(upperCaseTransformer).pipe(writer)

 