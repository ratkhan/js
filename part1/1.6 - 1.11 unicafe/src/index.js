import React, {useState} from 'react'
import ReactDOM from 'react-dom'


const Statistics = (props) => {
    const good = props.good;
    const bad = props.bad;
    const neutral = props.neutral;

    if (good + bad + neutral === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    return (
        <div>
            <h1>statistics</h1>
            <table>
            <Statistic text={'good'} value={good}/>
            <Statistic text={'neutral'} value={neutral}/>
            <Statistic text={'bad'} value={bad}/>
            <Statistic text={'all'} value={good+neutral+bad}/>
            <Statistic text={'average'} value={((good + bad + neutral)>0?(good - bad)/(good + bad + neutral):0)}/>
            <Statistic text={'positive'} value={(100 * good/(bad + good + neutral)) + ' %'}/>
            </table>
            </div>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const App = (props) => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    }

    const handleBadClick = () => {
        setBad(bad + 1);
    }

    return (
        <div>
            <div>
                <h1>give feedback</h1>
                <Button onClick={handleGoodClick} text='good'/>
                <Button onClick={handleNeutralClick} text='neutral'/>
                <Button onClick={handleBadClick} text='bad'/>
                <Statistics good={good} neutral={neutral} bad={bad} />
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);

