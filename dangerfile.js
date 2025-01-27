import {danger,fail} from 'danger'



const modifiedFiles=danger.git.modified_files || danger.git.created_files


console.log(modifiedFiles)