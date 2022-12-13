const {spawn} = require('child_process');

const childPython = spawn('python',['prediction.py']);


childPython.stdout.on('data',(data)=>{
    console.log(`stdout: ${data}`);
});

childPython.stderr.on('data',(data)=>{
    console.log(`stderr: ${data}`);
});

childPython.on('close',(code)=>{
    console.log(`exit code: ${code}`);
});