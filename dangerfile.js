import {danger,fail} from 'danger'

const  {execSync} =require('child_process')
const { readFileSync } = require("fs");


// const createdFilterAddedFiles = execSync('git diff --name-only --cached --diff-filter=AM').toString().split('\n').filter(Boolean);


let createdModifiedFiles=execSync(`git diff --name-only --cached --diff-filter=AM`).toString().split("\n").filter(Boolean)
console.log("Both added and modified file is ",createdModifiedFiles)


let modifiedFiles=danger.git.modified_files || danger.git.created_files
console.log("modified file is ",modifiedFiles)


modifiedFiles=createdModifiedFiles.filter(file=>{
    return file.endsWith(".java")
})



const addedModifiedFiles=[...danger.git.modified_files,...danger.git.created_files]

addedModifiedFiles.forEach((file=>{
     const fileContent=readFileSync(file,'utf8');
     const modifiedfilecontent=fileContent.split("\n")
     modifiedfilecontent.forEach((line=>{
        if(line.includes("System.out.println"))
        {
            fail(`System keyword are present \t ,file name is ${file} \t`,line)
        }
     }))

}))


addedModifiedFiles.forEach((file=>{
    
    console.log("File is ",file);

    const checkStyleOutput=execSync(`java -jar checkstyle-10.21.2-all.jar -c checkstyle.xml ${file}`).toString()


    console.log("❌ CheckStyle Output Error",checkStyleOutput)
        
}))









