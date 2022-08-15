import { useState } from 'react'
import { Command } from '@tauri-apps/api/shell';
import { resourceDir } from '@tauri-apps/api/path';
import './App.css'

function App() {
  const [output, setOutput] = useState("")
  
  const startCommand = async () => {
    console.log(`Running`, await resourceDir(), "node ../../../dummy-cli-program.js")
    const command = new Command(
      'node',
      '../../../dummy-cli-program.js',
      { cwd: await resourceDir() }
    );
    command.on('close', data => {
      setOutput(output => `${output}\nclose: ${data}`);
    });
    command.on('error', data => {
      setOutput(output => `${output}\nerror: ${data}`);
    });
    command.stdout.on('data', data => {
      setOutput(output => `${output}\nstdout: ${data}`);
    });
    command.stderr.on('data', data => {
      setOutput(output => `${output}\nstderr: ${data}`);
    });

    command.spawn().then(({kill}) => setTimeout(() => {
      kill();
      setOutput(output => `${output}\nKILL SIGNAL SENT`);
    }, 1000))
  }

  return (
    <div className="App">
      <button onClick={startCommand}>Start script and kill after 1 second</button>
      <pre>{output}</pre>
    </div>
  )
}

export default App
