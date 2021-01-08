import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

function FunctionalComponent(props) {
  return <h1>Hello, {props.name}, I'm a functional component</h1>
}

class ClassComponent extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}, I'm a class Component</h1>
  }
}

class DownStreamTest extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return <h6>DownStreamTest: this time ({this.props.time}) is passed by downstream</h6>
  }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world</h1>
        <h2>It's {this.state.date.toLocaleTimeString()}</h2>
        <DownStreamTest time={this.state.date.toLocaleTimeString()} />
      </div>
    )
  }

  tick() {
    const now = new Date();
    this.setState({ date: now })
  }

  componentDidMount() {
    this.timerId = setInterval(() => void this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }
}

class ClassToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false
    }
    this.toggle = this.toggle.bind(this);
  }

  render() {
    return (
      <button onClick={this.toggle}>
        {this.state.isOn ? "on" : "off"}
      </button>
    )
  }

  toggle(e) {
    console.log(e);
    this.setState((state, props) => {
      return { isOn: !state.isOn }
    })
  }
}

class BoilingIndicator extends React.Component {
  render() {
    if (this.props.celsius >= 100)
      return <p>The water would boil</p>
    return <p>The water would not boil</p>
  }
}

const scaleName = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return(
      <fieldset>
        <legend>Enter temperature in {scaleName[scale]}</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

function toCelsius(f) {
  return (f - 32) * 5 / 9;
}

function toFahrenheit(c) {
  return (c * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) return "";
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '', scale: 'c' }
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this); 
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius);
    const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit);

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />

        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />

        <BoilingIndicator celsius={celsius}/>
      </div>
    )
  }
}

function SplitPane(props) {
  return (
    <div className="pane">
      <div className="left">
        {props.left}
      </div>
      <div className="right">
        {props.right}
      </div>
    </div>
  );
}

// No context Demo
function App0(props) {
  return (
    <Button0 theme={props.theme} />
  );
}

function Button0(props) {
  return <ThemeButton0 theme={props.theme}/>
}

function ThemeButton0(props) {
  return <button>{props.theme}</button>
}

// Context Demo
const ThemeContext1 = React.createContext('light');
function App1(props) {
  return (
    <ThemeContext1.Provider value="dark">
      <Button1 />
    </ThemeContext1.Provider>
  )
}

function Button1(props) {
  return <ThemeButton1 />
}

class ThemeButton1 extends React.Component {
  static contextType = ThemeContext1

  render() {
    return <button>{this.context}</button>
  }
}

// Context API
// 1. Context.Provider
// 2. Context.Consumer
// 3. Context.displayName
// 4. Class.contextType, this.context, context

// Dynamic Context Demo
const themes = {
  light: {
    backgroundColor: '#fff',
    color: "#000"
  },
  dark: {
    backgroundColor: '#000',
    color: "#fff"
  }
}
const ThemeContext2 = React.createContext(themes.light);

class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: themes.light };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.dark
                ? themes.light
                : themes.dark
      }))
    };
  };

  render() {
    return (
      <div>
        <ThemeContext2.Provider value={this.state.theme}>
          <ThemeToggleButton2 changeTheme={this.toggleTheme} />
        </ThemeContext2.Provider>
        <ThemeButton2>Default theme</ThemeButton2>
      </div>
    )
  }
}

class ThemeToggleButton2 extends React.Component {
  render() {
    const { props } = this;
    // 注意 : 这里的按钮文本是通过 props.children 传递给 ThemeButton2 的
    return (
      <ThemeButton2 onClick={props.changeTheme}>
        Toggle theme
      </ThemeButton2>
    )
  }
}

class ThemeButton2 extends React.Component {
  render() {
    const { props } = this;
    const { backgroundColor, color  } = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor, color}} />
    )
  }
}
ThemeButton2.contextType = ThemeContext2;

// Update Context in children Demo
const ThemeContext3 = React.createContext({
  theme: themes.light,
  toggleTheme: () => {}
});

class App3 extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.light
                ? themes.dark
                : themes.light
        }));
      };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    }
  }

  render() {
    return (
      <ThemeContext3.Provider value={this.state}>
        <ThemeToggleButton3 />
      </ThemeContext3.Provider>
    )
  }
}

function ThemeToggleButton3(props) {
  // 通过解构赋值解析 context 中的 theme 和 toggleTheme
  return (
    <ThemeContext3.Consumer>
      {({ theme, toggleTheme }) => {
        const { backgroundColor, color } = theme;
        return <button onClick={toggleTheme}
                       style={{backgroundColor, color}}>
                  Toggle theme
                </button>
      }}
    </ThemeContext3.Consumer>
  )
}

// Consume multiple context demo


ReactDOM.render(
  <div>
    <FunctionalComponent name="zan" />
    <ClassComponent name="qwq" />
    <Clock />
    <ClassToggleButton />
    {/* 由于以 props 的形式传入 value, 所以无法编辑 input */}
    {/* <input value="foo" /> */}
    {/* 传入 null / undefined 时可以编辑 */}
    {/* <input value={null} /> */}
    <Calculator />
    <SplitPane left={<span>left</span>} right={<span>right</span>} />
    <App0 theme="light" />
    <App1 />
    <App2 />
    <App3 />
  </div>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
