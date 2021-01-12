# React



## 核心概念



### Hello World

```react
ReactDOM.render(
    <h1>Hello, world!</h1>
    document.getElementById('root')
)
```



### JSX 简介

```jsx
const element = <h1>Hello, world</h1>
```

以上语法被称为 JSX, 是 JavaScript 语法的扩展. JSX 可以生成 React "元素".



#### 在 JSX 中嵌入表达式

通过 `{}` 我们可以在 JSX 嵌入表达式

```jsx
const name = 'zanqwq';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
    element,
    document.getElementById('root')
);
```



#### JSX 也是个表达式

在编译之后, JSX 表达式会被转化成普通的 JavaScript 函数调用, 并取其返回的 JavaScript 对象, 例如在 `if` 和 `for` 循环中使用 JSX, 将 JSX 赋值给变量, 将 JSX 作为参数传入, 在函数中返回 JSX 等 :

```jsx
function getGreeting(user) {
    if (use) {
        return <h1>Hello, {user}</h1>
    }
    return <h1>Hello, Stranger</h1>
}
```



#### JSX 特定属性

可以通过引号来将属性值指定为字符串字面量, 也可以使用 `{}` 嵌入一个 JavaScript 表达式 : 

```jsx
const element = <img src={user.avatarUrl}></img>
```

> 注意不要在 `{}` 外加 `""`

> JSX 语法上更接近 JavaScript 而不是 HTML, 所以 React DOM 使用 `camelCase` 定义属性名, 而不使用 HTML 的命名约定.
>
> 例如在 JSX 里 `class` 变成了 `className`



#### JSX 防止注入攻击

React DOM 在渲染输入内容前默认会进行转义, 以防止注入攻击.



#### JSX 表示对象

Babel 会将 JSX 转译成一个名为 `React.createElement()` 函数调用, 例如以下代码等效 :

```jsx
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```



实际上它创建了一个类似于以下的对象 :

```jsx
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

这些对象被称为 "React 元素". 它们描述了我们希望在屏幕上看到的内容. React 通过读取这些对象, 然后使用它们构建 DOM 以及保持随时更新.



### 元素渲染

与浏览器的 DOM 元素不同, React 元素是创建开销极小的普通对象. React DOM 会负责更新 DOM 来与 React 元素保持一致.

> **注意：**
>
> 你可能会将元素与另一个被熟知的概念——“组件”混淆起来。我们会在下一个章节介绍组件。组件是由元素构成的。



#### 将一个元素渲染为 DOM

假设 HTML 文件有一个 `<div>`

```html
<div id="root"></div>
```

我们称之为根 DOM 节点, 该节点内所有内容都将由 React DOM 管理.



想要将一个 React 元素渲染到根 DOM 节点中, 需要将元素传入 `ReactDOM.render` 函数中



#### 更新已渲染的元素

React 元素是不可变对象, 一旦被创建则无法更改其子元素或属性.

根据已有知识, 更新 UI 的唯一方式为创建一个新的元素并传入 `ReactDOM.render` 中.



例如一个计时器 : 

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```



> 在实践中, 大多数 React 应用只会调用一次 `ReactDOM.render`. 在下个章节学习如何封装这些代码到有状态组件中.



#### React 值更新需要更新的部分

React DOM 会将元素和它的子元素与它们之前的状态进行比较, 并只会进行必要的更新来使 DOM 达到预期的状态



### 组件 & Props

组件允许将 UI 拆分成独立可复用的代码片段



组件, 概念上类似于 JavaScript 函数, 接收任意的入参 (即 `props`) 并返回用于描述页面内容的 React 元素.



#### 函数组件与 class 组件

定义组件的最基本方式为编写 JavaScript 函数 :

```jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>
}
```

该函数是一个有效 React 组件, 因为它接收唯一带有数据的 `props` 对象并返回一个 React 元素. 这类组件被称为 "函数组件", 因为它本质为 JavaScript 函数.



同时也可以使用 ES6 的 `class` 定义组件 :

```jsx
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>
    }
}
```



#### 渲染组件

之前的 React 元素都是些 DOM 标签, 而 React 元素也可以是用户定义组件 :

```jsx
const element = <Welcome name="zan" />
```

当 React 元素为用户定义组件时, 它将 JSX 接收到的属性 (attributes) 以及子组件 (children) 转换为单个对象传递给组件, 这个对象被称为 `props`



> 注意 : 组件名称必须以大写字母开头
>
> React 会将小写字母开头的组件视为原生 DOM 标签.



#### 组合组件

组件可以在输出中引用其他组件, 例如 :

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```



#### 提取组件

将组件拆分成更小的组件, 我们建议从组件自身的角度命名 props, 而不是依赖于调用组件的上下文命名.



#### Props 的只读性

组件无论是使用函数声明还是 `class` 声明, 都绝不能修改自身的 `props`

```jsx
function sum(a, b) {
    return a + b;
}
```

以上函数被称为纯函数, 它不修改入参, 且多次调用相同入参始终返回相同结果

```jsx
function withdraw(account, amount) {
  account.total -= amount;
}
```

相反以上不是纯函数



React 非常灵活, 但也有个严格的规定 : 

> **所有 React 组件都必须像纯函数一样保护它们的 props 不被更改**



下一章将会看到新的概念 `state`, 在不违反上述规则的情况下, `state` 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容



### State & 生命周期

在本章中我们学习如何使用 `state` 和生命周期封装真正可复用的 `Clock` 组件, 而不是通过 `setInterval` 每隔一段时间 `ReactDOM.render` 一次



先从外观开始 :

```jsx
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

这样需要设置计时器, 且每秒更新 UI.



理想情况下我们希望只写一次代码, 便让 `Clock` 组件自我更新 :

```jsx
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)
```

我们可以通过 `state` 实现. `state` 类似于 `props`, 但是是完全私有, 完全受控于当前组件的.



首先, 先将函数组件转换为 `class` 组件

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}
```



#### 向 class 组件添加局部的 state

通过三步将 `date` 从 `props` 移到 `state` 中 :

1. 替换 `render` 方法中 `this.props.date` 为 `this.state.date`

2. 为 `class` 添加构造函数, 在构造函数中为 `this.state` 赋值.

   通过 `super` 将 `props` 传递到父类构造器中

   > `class` 组件应该始终使用 `props` 参数调用父类的构造函数

3. 移除 `<Clock />` 元素中的 `date` 属性

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```



接下来通过生命周期函数设置更新



#### 将生命周期方法加入到 Class 中

在具有许多组件的应用中, 当组件被销毁时释放资源是很重要的.

组件第一次被渲染到 DOM 中时, 被称为挂载 (mount). 我们在这个步骤中设置定时器.

同时, 组件从 DOM 中删除时, 被称为卸载 (unmount). 我们应该在这时候清除定时器.

通过为 class 生命一些被称为 "生命周期方法" 的特殊方法, 组件便会在相应阶段执行这些方法.



`componentDidMount` 方法在组件已经被渲染到 DOM 后运行, 因此在这里设置定时器 : 

```jsx
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
}
```

计时器 ID 被保存在 `this` 中, 尽管 `this.props` 和 `this.state` 是 React 设置的, 且拥有特殊意义的字段. 但我们其实可以向 class 中添加任意不参与数据流 (比如计数器 ID) 的额外字段.



我们在 `componentWillUnmount` 中清除计时器 : 

```jsx
componentWillUnmount() {
    clearInterval(this.timerID);
}
```



最后, 实现定时器中的 `tick` 方法, 使用 `this.setState` 来更新组件 `state`

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```



#### 正确使用 State

1. 不要直接修改 `state`

   例如以下代码不会重新渲染组件 : 

   ```jsx
   this.state.foo = "bar";
   ```

   而应该使用 `setState`

   ```jsx
   this.setState({ foo: "bar" });
   ```

   > 构造函数是唯一可以给 `this.state` 赋值的地方

   注意在构造函数中赋值的方式 : 

   ```jsx
   constructor(props) {
       super(props);
       console.log(this.state); // undefined
       this.state.foo = "bar" // error, since state is still undefined now
       
       this.state = { foo: "bar" }; // correct
   }
   ```

2. State 的更新可能是异步的

   处于性能考虑, React 可能会将多个 `setState` 调用合成一个.

   因为 `this.props` 和 `this.state` 可能会异步更新, 因此 **不要** 依赖它们的值来更新下一个状态, 例如 :

   ```jsx
   // Wrong
   this.setState({
     counter: this.state.counter + this.props.increment,
   });
   ```

   要解决这个问题, 应该为 `setState` 传入一个函数. 函数以**上一个** `state` 为第一个参数, 将**此次**更新被应用时的 `props` 作为第二个参数 :

   ```jsx
   this.setState(function(state, props) {
     return {
       counter: state.counter + props.increment
     };
   });
   ```

3. State 的更新会被合并

   调用 `setState` 时, React 会将提供的对象合并到当前 `state` 中.

   例如 : 

   ```jsx
   constructor(props) {
       super(props);
       this.state = {
           posts: [],
           comments: []
       }
   }
   ```

   然后分别用 `setState` 更新它们

   ```jsx
   componentDidMount() {
       fetchPosts().then(response => {
         this.setState({
           posts: response.posts
         });
       });
   
       fetchComments().then(response => {
         this.setState({
           comments: response.comments
         });
       });
   }
   ```



#### 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的, 并且它们也并不关心它是函数组件还是 class 组件

这就是为什么称 state 为局部的或是封装的的原因. 除了拥有并设置了它的组件, 其他组件都无法访问



组件可以选择将它的 `state` 作为 `props` 传递给其子组件 

组件自身无法知道其 `props` 的来源, 这通常被称作 "自上而下" 或 "单向" 的数据流.

任何 `state` 总是属于特定的组件, 而且从该 `state` 派生的任何数据或 UI 只能影响树中 "低于" 它们的组件.

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话, 那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源, 但是它只能向下流动



### 事件处理

React 元素的事件处理和 DOM 元素类似但语法上不同 :

* React 事件名使用 `camelCase`

* 使用 JSX 语法时, 需要传入函数作为事件处理函数而不是字符串, 例如 :

  ```html
  <!-- 传统 -->
  <button onclick="activateLasers()">
    Activate Lasers
  </button>
  ```

  ```jsx
  // React
  <button onClick={activateLasers}>
    Activate Lasers
  </button>
  ```

  不能通过返回 `false` 来阻止默认行为. 必须显式使用 `preventDefault`. 例如 :

  ```html
  <!-- 传统 -->
  <a href="#" onclick="console.log('The link was clicked.'); return false">
    Click me
  </a>
  ```

  ```jsx
  // React
  function ActionLink() {
    function handleClick(e) {
      e.preventDefault();
      console.log('The link was clicked.');
    }
  
    return (
      <a href="#" onClick={handleClick}>
        Click me
      </a>
    );
  }
  ```

  这里 `e` 是一个合成事件. React 根据 W3C 规范来定义这些合成事件, 所以不用担心浏览器兼容问题.



当使用 class 组件时, 需要额外的工作, 例如以下 `Toggle` 组件 : 

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```



如果 `bind` 使用很麻烦, 可以使用两种方法 :

1. 使用实验中的 public class fields 语法 :

   ```jsx
   class LoggingButton extends React.Component {
     // 此语法确保 `handleClick` 内的 `this` 已被绑定。
     // 注意: 这是 *实验性* 语法。
     handleClick = () => {
       console.log('this is:', this);
     }
   
     render() {
       return (
         <button onClick={this.handleClick}>
           Click me
         </button>
       );
     }
   }
   ```

2. 在回调中使用箭头函数 : 

   ```jsx
   class LoggingButton extends React.Component {
     handleClick() {
       console.log('this is:', this);
     }
   
     render() {
       // 此语法确保 `handleClick` 内的 `this` 已被绑定。
       return (
         <button onClick={() => this.handleClick()}>
           Click me
         </button>
       );
     }
   }
   ```

   该语法问题在于每次渲染组件时都创建不同的回调函数, 大多数情况没什么问题. 但如果该回调作为 prop 传入子组件时, 这些组件可能进行额外的重新渲染. 因此建议使用 `bind` 或 public class field 来避免性能问题



#### 向事件处理器传递参数

在循环中, 通常会为事件处理函数传递额外参数. 例如 `id` 为删除行的 id, 以下两种方式等价 :

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```



两种情况下, React 事件对象 `e` 都会作为第二参数传递给回调 `deleteRow`. 如果通过箭头函数则事件对象必须显式传递事件对象. 而 `bind` 方式会将事件对象以及更多参数隐式传递



### 条件渲染

`if` `else if` `else`

元素变量 : 

```jsx
function Foo(props) {
    let foo;
    if (props.bar) foo = <span>true</span>;
    else foo = <span>false</span>;
    return <div>{foo}</div>
}
```

`&&` `? :`

`return null` 阻止组件渲染



### 列表 & Key



#### 渲染多个组件

```jsx
const numbers = [1, 2, 3, 4];
// 需要分配 key
const doubled = numbers.map((n) => <li key={n}>{n * 2}</li>);

ReactDOM.render(
	<ul>{doubled}</ul>,
	document.getElementById("root");
);
```



#### key

key 帮助 React 识别哪些元素改变了, 因此应该给数组中每个元素一个确定的标识

当数组元素没有 id, 万不得已可以使用数组 index 作为 key

```jsx
const todoItems = todos.map((todo, index) => {
    return <li key={index}>{todo.text}</li>
});
```

如果列表项目的顺序可能变化, 不建议使用索引作为 key, 因为这会使得性能变差, 还可能引起组件状态的问题.



#### 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义.

例如 : 

```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```



正确例子 : 

```jsx
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()}              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```



#### key 只在兄弟节点间必须唯一

数组元素中使用的 key 在其兄弟节点间应该唯一, 但不需要全局唯一. 例如当用一个数组生成两个元素数组时, 可以使用相同 key : 

```jsx
const nums = [1, 2, 3];
const foo = nums.map(n => <li key={n}>{n}</li>);
const bar = nums.map(n => <li key={n}>{n}</li>);
```



key 会传递信息给 React 但不会传递给组件. 如果组件中需要用 `key`, 需要用其他 prop 传入. 例如 `<Foo key={id} id={id} />`, 可以读取 `this.props.id` 但无法读取 `this.props.key`



### 表单

React 中, html 表单元素工作方式和其他 DOM 元素不同, 因为表单元素通常会保持一些内部 state.



#### 受控组件

HTML 中, 表单元素通常维护自己的 state, 并根据用户输入更新. 可以结合 React 的 `state` 和 `setState`, 使 React 的 state 成为"唯一数据源". 渲染表单的 React 组件控制着用户输入过程中表单发生的操作. 被 React 以这种方式控制取值的表单输入元素称作 "受控组件".



`<input type="file" />` 中的 `value` 是只读的, 所以它是非受控组件.



#### 处理多输入

当需要处理多个 input 时, 为每个添加 `name`, 并让处理函数根据 event.target.name` 处理 : 

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```



#### 受控输入空值

在受控组件上指定 value 的 prop 会阻止用户更改输入. 如果指定了 `value` 但输入仍可以编辑, 则可能是意外将 `value` 设置为 `undefined` 或 `null`. 例如 :

```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```



#### 受控组件替代品

有时使用受控组件会很麻, 因为你需要为数据变化的每种方式都编写事件处理函数, 并通过一个 React 组件传递所有的输入 state. 当你将之前的代码库转换为 React 或将 React 应用程序与非 React 库集成时, 这可能会令人厌烦. 在这些情况下, 你可能希望使用[非受控组件](https://react.docschina.org/docs/uncontrolled-components.html), 这是实现输入表单的另一种方式.



### 状态提升

通常多个组件需要反映相同的变化数据, 这时建议将共享状态提升到最近公共父组件中.

```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

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
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

这个例子中, 抽离了 `TemperatureInput` 组件, 将温度状态提升至 `Calculator` 中, 并通过 `TemperatureInput` 的 `onTemperatureChange` 这个 `props`, 完成了状态的更新.



### 组合 vs 继承

React 有强大的组合模式, 推荐使用组合而非继承实现组件间的代码重用.

本篇中, 考虑使用继承时遇到的问题, 并展示如何通过组合思想解决.



#### 包含关系

有些组件无法提前知晓其子组件具体内容, 建议通过使用 `children` 这个特殊的 `props` 来将子组件传递到渲染结果中. 例如 :

```jsx
function Foo(props) {
    return (
        <div className="foo">
            {props.children}
        </div>
    )
}
```

这使得别的组件可以通过 JSXX 嵌套, 将任意组件作为子组件传递过去. 例如 : 

```jsx
ReactDOM.render(
    <Foo>
        <div>foo</div>
        <span>bar</span>
    </Foo>,
    root
);
```

`Foo` JSX 标签中的所有内容将作为一个 `children` prop 传递给 `Foo` 组件.



由于 React 元素本质是对象, 所以可以将它们作为 prop 传递, 以达到内容分发的效果. 例如 : 

```jsx
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="Left">
                {props.left}
            </div>
            <div className="Right">
                {props.right}
            </div>
        </div>
    );
}

ReactDOM.render(
    <SplitPane
        left={<span>left</span>}
        right={<span>right</span>}
    />
    root,
);
```



### React 哲学

从设计稿开始, 假设已经有了返回 JSON 的 APi 以及设计师提供的组件设计稿



1. 将设计好的 UI 划分为组件层级

2. 用 React 创建静态版本 (因为编写静态版本时往往需要大量代码而不用考虑太多交互细节, 而添加交互时往往需要大量细节而不需要太多代码).

   静态版本不应该使用 `state`, 因为 `state` 代表了随时间会变化的数据, 应当在实现交互时使用.

   可以自上而下(先编写高层组件再编写低层组件) 或自下而上 (从低层基本组件到高层组件) 构建应用.

3. 确定 UI state 的最小且完整的表示. 只保留应用所需的可变 state 的最小集合, 其他数据均由它们产生.

   如何确定 state ?

   1. 由父组件 props 传递的不是 state
   2. 随时间推移不变的不是 state
   3. 可以根据其他 state 和 props 计算的值不是 state

4. 确定 state 的放置位置

   1. 找到根据这个 state 进行渲染的所有组件
   2. 找到它们的共同所有者 (common owner) 组件
   3. 如果找不到合适位置, 创建一个新组件来防止该 state, 并将该组件置于高于共同所有组件层级的位置

5. 添加反向数据流



## 高级指引



### Context

Context 提供了一种无需为每层组件手动添加 props, 就能在组件树间进行数据传递的方法.

一个典型 React 应用中, 数据通过 props 自上而下传递, 这对于某些属性很繁琐, 例如地区偏好, UI 主题, 这些属性是应用程序中许多组件都需要的. Context 提供了一种在组件间共享此类值的方式, 而不必显式地通过组件树的逐层传递 props.



#### 何时使用

Context 的设计目的是为了共享那些对于一个组件树而言是"全局"的数据, 例如当前认证用户, 主题, 语言等. 例如 :

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```



使用 context, 我们可以避免通过中间元素传递 props

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');
class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```



#### 使用前的考虑

Context 主要场景在 **很多** 不同层级的组件需要访问同样的数据. 需要谨慎使用, 因为这会使组件的 **复用性变差**.

**如果只是想要避免层层传递一些属性, 组件组合 (component composition) 有时是必 context 更好的解决方案**.



一种解决方式是将需要用到某些属性的组件本身传递下取, 这种对组件的 *控制反转*  减少了应用中需要传递的 prop, 这在很多场合使代码更加干净, 使你对根组件有更多把控, 但这并不适合每个场景 : 这种逻辑提升到组件树的更高层次来处理, 会使得高层组件变复杂, 并强行将低层组件适应这样的形式.



而且组件并不限制接收单个子组件, 可以传递多个子组件. 这种模式足够覆盖很多场景, 在这些场景下需要将子组件和之间关联的父组件解耦. 如果子组件需要在渲染前和父组件进行一些交流, 那么可以使用 render props



但有时组件树中很多不同层级的组件需要访问同一批数据. Context 让你能够将这些数据向组件树下所有组件进行 "广播", 这比替代方案要简单得多.



#### API

* `React.createContext`

  ```tsx
  declare namespace React {
      interface Context<T> {
          Provider: Provider<T>;
          Consumer: Consumer<T>;
          displayName?: string;
      }
      function createContext<T>(defaultValue: T): Context<T>
  }
  ```

  默认值**只有**在组件所在树中没有匹配到 Provider 时才会使用

* `Context.Provider`

  ```jsx
  <MyContext.Provider value={someValue} />
  ```

  每个 `Context` 对象都会返回一个 Provider React 组件, 它允许消费组件订阅 context 变化.

  Provider 接收一个 `value` 属性, 传递给消费者组件. 一个 Provider 可以和多个消费者组件有对应关系.

  多个 Provider 也可以相互嵌套, 里层会覆盖外层数据.

  ```jsx
  const C = React.createContext("lv0");
  class App extends React.Component {
      static contextType = C;
  
      render() {
          return (
              <div>
                  {this.context}
                  <C.Provider value="lv1">
                      <C.Consumer>
                          {x => {
                              return (
                                  <div style={{marginLeft: "20px"}}>
                                      {x}
                                      <C.Provider value="lv2">
                                          <C.Consumer>
                                              {y => {
                                                  return (
                                                      <div style={{marginLeft: "20px"}}>
                                                          {y}
                                                      </div>
                                                  )
                                              }}
                                          </C.Consumer>
                                      </C.Provider>
                                  </div>
                              )
                          }}
                      </C.Consumer>
                  </C.Provider>
              </div>
          )
      }
  }
  ```

  当 Provider 的 `value` 变化, 其内部所有消费者组件都会重新渲染.

  Provider 及其内部 consumer 组件都不受限于 `shouldComponentUpdate` 函数, 因此当 consumer 组件在其祖先组件推出更新的情况下也能更新.

  通过新旧值检测来确定变化, 使用了与 `Object.is` 相同的算法.

  > 注意传递对象给 `value` 时检测变化的方式会导致一些问题, 详见[注意事项](#注意事项)
  >
  > Provider 必须搭配 `value` 使用

* `Class.contextType`

  ```tsx
  declare namespace React {
      class Component<P, S> {
          static contextType?: Context<any>
          
          // ...
      }
  }
  ```

  挂载在 `class` 上的 `contextType` 属性会被重新赋值为一个由 `React.createContext` 创建的 `Context` 对象. 这使得我们可以通过使用 `this.context` (类组件) 来消费最近 `Context` 上的值. 我们可以在整个生命周期中访问到它, 包括 `render` 函数

  > 应该只通过该 API 来订阅单一的 Context. 如果想订阅多个, 详见[消费多个  Context](#消费多个 Context)
  >
  > 如果使用实验中的 public class field 语法, 可以使用 `static` 关键字来初始化 `contextType`

* `Context.Consumer`

  context 的消费者, 例如 :

  ```jsx
  <MyContext.Consumer>
      {value => /* render base on this context value */}
  </MyContext.Consumer>
  ```

* `Context.displayName`

  context 对象接收一个名为 `displayerName` 的 property, 类型为字符串. React DevTools 使用该字符串来确定 context 显示内容.

> 注意 : 不要单独提供 Context. 要么使用 Provider(并提供 `value` 属性), 要么使用 Consumer







#### 例子

##### 动态 Context

```jsx
export const themes = {
  light: {
    backgroundColor: '#fff',
    color: '#000'
  },
  dark: {
    backgroundColor: '#000',
    color: '#fff'
  },
};
const ThemeContext = React.createContext(
  themes.dark // 默认值
);

class ThemedButton extends React.Component {
  render() {
    const { props } = this;
    const { backgroundColor, color } = this.context;
    // 这里 button 的 text 通过 props.children 传入
    return (
      <button
        {...props}
        style={{backgroundColor, color}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Toggle Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
            
        <ThemedButton />
      </div>
    );
  }
}
```



##### 嵌套组件中更新 Context

在一个组件树中嵌套很深的组件中更新 context 是很有必要的. 这种场景下, 可以通过 context 传递一个函数, 使得 consumers 组件更新 context

```jsx
// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({theme, toggleTheme}) => (
        <button          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>

          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}
```



##### 消费多个 Context

为了确保 context 快速进行重新渲染, React 需要使每个 consumers 组件的 context 在组件树中称为一个单独节点.

```react
const ThemeContext = React.createContext('light');

// 用户登录 context
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;

    // 提供初始 context 值的 App 组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
            <Content />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

// 一个组件可能会消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
			  <div>theme: {theme}, user: {user}</div>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}
```

如果两个或更多的 context 值经常被一起使用, 那么可能要考虑创建额外的渲染组件, 以提供这些值.



#### 注意事项

因为 context 会使用参考标识 (reference identity) 来决定何时进行渲染, 这里可能有陷阱, 当 provider 进行重新渲染时, 可能会在 consumers 组件中触发意外的渲染. 此时应该将 value 提升至父组件.



### 错误边界

部分 UI 的 JS 错误不应该导致整个应用崩溃, 因此 React 16 引入错误边界概念.

错误边界是一种 React 组件, 它可以捕获并打印发生在其子组件树任意位置的 JS 错误, 并渲染出备用 UI, 而不是渲染那些崩溃了的子组件树. 错误边界在渲染期间, 生命周期方法和整个组件树的构造函数中捕获错误.

> 错误边界无法捕获以下场景的错误 :
>
> * 事件处理
> * 异步代码
> * 服务端渲染
> * 它自身抛出的错误



当一个 class 组件定义了 `static getDerivedStateFromError` 或 `componentDidCatch` 两个生命周期方法中的任意一个(或两个)时, 则它变成一个错误边界. 抛出错误后, 使用 `static getDerivedStateFromError` 接收抛出 `error` 为参数并返回新的 `state` ,信息并返回, 用 `componentDidCatch` 打印错误信息.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundaries in React 16.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
      <ErrorBoundary><BuggyCounter /></ErrorBoundary>
    </div>
  );
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
);

```



错误边界类似于 JS `catch`, 但错误边界只针对 React 组件. 只有 class 组件可以为错误边界组件. 多数情况下只需要声明一次边界组件并在整个应用中使用.

如果一个错误边界无法渲染错误信息, 则错误冒泡至最近的上层错误边界, 这也类似于 JS `catch` 机制.



#### Uncaught Errors 的新行为

自 React 16 起, 任何未被2错误边界捕获的错误将导致整个 React 组件树被卸载



#### 组件栈追踪

开发环境下, React 16 打印任何渲染期间的错误到控制台. 除了错误信息和 JS 栈, React 16 还提供了组件栈追踪.

> 注意, 它仅用于开发环境, 生产环境必须禁用



#### 事件处理器

错误边界无法捕获事件处理器内部的错误.

React 不需要错误边界捕获事件处理器的错误, 因为它的设计意图是用于捕获渲染期间的错误, 而事件处理器不属于渲染期间的代码



### TODO Refs 转发

Ref 转发是将 ref 自动通过组件传递到其一子组件的技巧.



#### 转发 refs 到 DOM 组件



### Fragments

React 常见模式是一个组件返回多个元素. Fragments 允许将子列表分组, 而无需向 DOM 添加额外节点



#### 动机

一种常见模式是组件返回一个子元素列表, 例如 : 

```jsx
class Columns extends React.Component {
    render() {
        return (
            <div>
                <td>foo</td>
                <td>bar</td>
            </div>
        )
    }
}
    
class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        )
    }
}

// Table 渲染的 HTML 失效
```

`Columns` 需要返回多个 `<td>` 元素以使渲染的 HTML 有效. 如果 `Columns` 渲染中使用了父 `div` 那么生成的 HTML 将失效.

Fragment 则解决了这个问题



#### 用法

例 : 

```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```



#### 短语法

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

你可以像使用任何其他元素一样使用 `<> </>`, 除了它不支持 key 或属性



#### 带 key Fragments

使用显式的 `<React.Fragment>` 语法声明带 `key` 的 `Fragment`, 例如 :

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // 没有`key`，React 会发出一个关键警告
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

> 目前 : `key` 是唯一可以传给 `Fragment` 的属性



### 高阶组件

高阶组件 (High-Order-Component —— HOC) 是 React 中用于复用组件逻辑的高级技巧. HOC 自身不是 React API 的一部分, 它是基于 React 的组合特性而形成的设计模式.

具体来说, **HOC 是以组件为参数, 返回值为新组件的函数**

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

组件是将 `props` 等数据转化成 UI, 而 HOC 将组件转化为另一个组件.

HOC 在 React 第三方库很常见, 例如 Redux 的 `connect`

本章讨论高阶组件为什么有用, 以及如何编写自己的 HOC 函数



#### 使用 HOC 解决横切关注点问题



### 深入 JSX

JSX 只是 `React.createElement(component, props, ...children)` 函数的语法糖, 例如下面的代码 : 

```jsx
<MyButton color="blue" shadowSize={2}>Click me</MyButton>
```

会编译为 : 

```jsx
React.createElement(
    MyButton,
    { color: 'blue', shadowSize: 2 },
    'Click me'
)
```



#### 指定 React 元素类型

JSX 标签的第一部分指定了 React 元素类型.

大写字母开头的 JSX 意味着它们是 React 组件, 这些标签会被编译为对命名变量的直接引用, 所以, 例如使用 `<Foo />` 时, `Foo` 必须包含在作用域内.

* **由于 JSX 被编译为 `React.createElement`, 所以 `React` 库也必须在包含 JSX 的代码作用域内, 即使它们没有被直接使用**

* **可以在JSX 类型中使用点语法**, 例如 : 

  ```jsx
  import React from 'react';
  
  const MyComponents = {
    DatePicker: function DatePicker(props) {
      return <div>Imagine a {props.color} datepicker here.</div>;
    }
  }
  
  function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
  }
  ```

* **用户定义组件名必须以大写字母开头**, 小写字母开头元素代表 HTML 内置组件, 建议始终以大写字母开头命名组件, 如果是在需要用小写, 在使用在 JSX 表达式内前, 给组件一个大写字母开头的变量, 例如 :

  ```jsx
  import React from 'react';
  
  // 错误！组件应该以大写字母开头：
  function hello(props) {
    // 正确！这种 <div> 的使用是合法的，因为 div 是一个有效的 HTML 标签
    return <div>Hello {props.toWhat}</div>;
  }
  
  function HelloWorld() {
    // 错误！React 会认为 <hello /> 是一个 HTML 标签，因为它没有以大写字母开头：
    return <hello toWhat="World" />;
  }
  ```

  ```jsx
  import React from 'react';
  
  // 正确！组件需要以大写字母开头：
  function Hello(props) {
    // 正确！ 这种 <div> 的使用是合法的，因为 div 是一个有效的 HTML 标签：
    return <div>Hello {props.toWhat}</div>;
  }
  
  function HelloWorld() {
    // 正确！React 知道 <Hello /> 是一个组件，因为它是大写字母开头的：
    return <Hello toWhat="World" />;
  }
  ```

* **在运行时选择类型**

  不能用表达式作为 React 元素类型, 如果需要动态表达式来决定元素类型, 首先给它赋值大写字母开头变量. 例如 :

  ```jsx
  import React from 'react';
  import { PhotoStory, VideoStory } from './stories';
  
  const components = {
    photo: PhotoStory,
    video: VideoStory
  };
  
  function Story(props) {
    // 错误！JSX 类型不能是一个表达式。
    return <components[props.storyType] story={props.story} />;
  }
  ```

  ```jsx
  import React from 'react';
  import { PhotoStory, VideoStory } from './stories';
  
  const components = {
    photo: PhotoStory,
    video: VideoStory
  };
  
  function Story(props) {
    // 正确！JSX 类型可以是大写字母开头的变量。
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
  }
  ```



#### JSX 中的 Props

有多种方式可以在 JSX 中指定 props.

* JS 表达式作为 `props` : 将表达式包裹在 `{}` 中作为 prop 传递给 JSX 元素

* 字符串字面量

  > 以字符串字面量赋值给 prop, 其值是未转义的, 例如以下两个 JSX 表达式等价 :
  >
  > ```jsx
  > <MyComponent message="&lt;3" />
  > 
  > <MyComponent message={'<3'} />
  > ```

* 不带值的 prop 默认为 `true`

* 属性展开

  可以利用 `...` 运算符, 在 JSX 中传递整个 `props` 对象

  ```jsx
  function App1() {
    return <Greeting firstName="Ben" lastName="Hector" />;
  }
  
  function App2() {
    const props = {firstName: 'Ben', lastName: 'Hector'};
    return <Greeting {...props} />;
  }
  ```

  也可以选择保留组件需要接受的 props, 并使用 `...` 将其他 props 传递下去.

  ```jsx
  const Button = props => {
    const { kind, ...other } = props;
    const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
    return <button className={className} {...other} />;
  };
  
  const App = () => {
    return (
      <div>
        <Button kind="primary" onClick={() => console.log("clicked!")}>
          Hello World!
        </Button>
      </div>
    );
  };
  ```



#### JSX 中的子元素

包含在开始标签和结束标签间的 JSX 表达式内容将作为特定属性 `props.children` 传递给外层组件. 有几种不同的方法来传递子元素

* 字符串字面量, 例如 `<MyComponent>string literal</MyComponent>`

* JSX 子元素

* JS 表达式作为子元素

* 函数作为子元素

  例如 : 

  ```jsx
  // 调用子元素回调 numTimes 次，来重复生成组件
  function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++)
      items.push(props.children(i));
    return <div>{items}</div>;
  }
  
  function ListOfTenThings() {
    return (
      <Repeat numTimes={10}>
        {(index) => <div key={index}>This is item {index} in the list</div>}
      </Repeat>
    );
  }
  ```

  但这种用法不太常见

* boolean, null, undefined 会被忽略, 例如以下 div 全部等价

  ```jsx
  <div />
  
  <div></div>
  
  <div>{false}</div>
  
  <div>{null}</div>
  
  <div>{undefined}</div>
  
  <div>{true}</div>
  ```

  这将有助于根据条件渲染 React 元素, 例如 `{showHeader && <Header />}`

  > 注意, 其他 "falsy" 值仍会被渲染, 例如 `0`
  >
  > ```jsx
  > <div>
  >     {props.message.length && 
  >         <Message message={props.message} />}
  > </div>
  > ```
  >
  > 以上代码在 length 为 `0` 时仍然会渲染出 `0`, 要解决这个问题, 确保 `&&` 左边为 boolean, 修改左边为 `props.message.length > 0`
  >
  > 反之, 如果想渲染 `false`, `null` 等值, 需要线转换为字符串.



### 性能优化

UI 更新需要昂贵的 DOM 操作, React 使用几种巧妙技术最小化 DOM 操作.

对于大部分应用, 使用 React 无需专门优化就已经拥有高性能了, 尽管如此我们仍然有方法加速 React 应用.

* 使用生产版本

* 使用 Chrome Performance 标签分析组件

* 使用 React 分析器

* 虚拟化长列表 : 这项技术会在有限的时间内仅渲染有限的内容

* 避免调停 (reconciliation), 使用 `shouldComponentUpdate(nextProps, nextState) : boolean` 生命周期函数提速

  大多数情况, 我们可以继承 `React.PureComponent` 以代替手写 `shouldComponentUpdate`. 它用当前与之前 `props` 和 `state` 的浅比较覆写了  `shouldComponentUpdate` 的实现

  ```jsx
  class CounterButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.color !== nextProps.color) {
        return true;
      }
      if (this.state.count !== nextState.count) {
        return true;
      }
      return false;
    }
  
    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
  }
  
  // 使用 PureComponent
  class CounterButton extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {count: 1};
    }
  
    render() {
      return (
        <button
          color={this.props.color}
          onClick={() => this.setState(state => ({count: state.count + 1}))}>
          Count: {this.state.count}
        </button>
      );
    }
  }
  ```

* `shouldComponentUpdate` 作用 : 结合 `vDOMEq` 标识一个节点是否需要调停.

* 不可变数据 : 通过 `Object.asign`, `...` 运算符等方式, 返回新对象, 避免修改旧对象, 以防止视图无法更新.



### Portals





### Profiler



### 协调



### Refs & DOM



### Render Props



### 静态类型检查



### 使用 PropTypes 类型检查



### 非受控组件







## API Reference

### React



### ReactDOM



### ReactDOMServer



### DOM 元素



### 合成事件





## Hooks

### 简介



### 概览



### 使用 State Hook



### 使用 Effect Hook



### Hook 规则



### 自定义 Hook



### API











# ReactDOM

[#注意事项]: 
[注意事项]: 