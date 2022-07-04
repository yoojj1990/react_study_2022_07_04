import './App.css';

function Header() {
  return (
    <header>
      <h1><a href="/">REACT</a></h1>
      <h1>IS GOOD!!</h1>
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ol>
        <li><a href="/">html</a></li>
        <li><a href="/">css</a></li>
        <li><a href="/">javascript</a></li>
      </ol>
    </nav>
  );
}

function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, React
      <img src=''></img>
    </article>
  );
}

function Hello(props) {
  return (
    <div>
      안녕하세요 저는 {props.name}입니다. 취미는 {props.habby}입니다.
    </div>
  );
}

function App() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Article></Article>
      <Hello name="리엑트!" habby="운동"></Hello>
      <Hello name="스프링!" habby="노래"></Hello>
    </div>
  );
}

export default App;
