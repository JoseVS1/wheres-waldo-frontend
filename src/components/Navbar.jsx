import { Stopwatch } from "./Stopwatch"

export const Navbar = ({stopwatchIsRunning, time, setTime}) => {
  return (
    <nav>
        <ul>
            <li className="title" onClick={() => window.location.reload()}><h1>Where's Waldo</h1></li>
            <li><Stopwatch stopwatchIsRunning={stopwatchIsRunning} time={time} setTime={setTime} /></li>
        </ul>
    </nav>
  )
}
