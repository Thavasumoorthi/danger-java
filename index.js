const { execSync } = require('child_process');

try {
  const checkStyleOutput = execSync(`java -jar checkstyle-10.21.2-all.jar -c checkstyle.xml Basic.java`).toString();
  console.log(checkStyleOutput)
} catch (error) {
  console.log(error.stderr.toString());  
  // This will print only the error output
}
