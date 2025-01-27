import {danger,fail} from 'danger'

const  {execSync} =require('child_process')
const { readFileSync } = require("fs");



let modifiedFiles=danger.git.modified_files || danger.git.created_files
modifiedFiles=modifiedFiles.filter(file=>{
    return file.endsWith(".java")
})


modifiedFiles.forEach((file=>{
     const fileContent=readFileSync(file,'utf8');
     console.log("+++File content is ",fileContent.split("\n"))
     const modifiedfilecontent=fileContent.split("\n")
     modifiedfilecontent.forEach((line=>{
        if(line.includes("System.out.println"))
        {
            console.log("System keyword are present \t ",`file name is ${file}`,line)
        }
     }))

}))


console.log(modifiedFiles)


