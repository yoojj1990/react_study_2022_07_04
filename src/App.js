import './App.css';

function Header(props) {
  console.log('props', props, props.title);
  return (
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onClickMode();
      }}>{props.title}</a></h1>
    </header>
  );
}

function Nav(props) {

  const list = []
  for(let i=0;i<props.topics.length;i++) {
    let dto = props.topics[i];
    list.push(<li key={dto.id}><a id={dto.id} href={"/"+dto.id} onClick={(event)=>{
      event.preventDefault();
      props.onClickMode(event.target.id);
    }}>{dto.title}</a></li>)
  }

  return (
    <nav>
      <ol>
        {list}
      </ol>
    </nav>
  );
}

function Article(props) {
  console.log('props', props, props.title);
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
      <img src=''></img>
    </article>
  );
}

function App() {
  const topics = [
    {id:1, title:"html", body:"html is Good"}, 
    {id:2, title:"css", body:"css is Good"}, 
    {id:3, title:"javascript", body:"javascript is Good"}
  ]

  return (
    <div>
      <Header title="React!!" onClickMode={()=>{alert('React is Good!')}}></Header>
      <Nav topics={topics} onClickMode={(id)=>{alert(id);}}></Nav>
      <Article title="Welcome" body="Hello, React"></Article>
    </div>
  );
}

export default App;
