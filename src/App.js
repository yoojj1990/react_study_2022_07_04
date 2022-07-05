import { useState } from "react";

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
      props.onClickMode(Number(event.target.id));
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

  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);

  const topics = [
    {id:1, title:"html", body:"html is Good"}, 
    {id:2, title:"css", body:"css is Good"}, 
    {id:3, title:"javascript", body:"javascript is Good"}
  ]

  let content = null;

  if(mode === "Welcome") {
    content = <Article title="Welcome" body="Hello, React"></Article>
  } else if(mode === "Read") {
    let title, body = null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id) {
        title = topics[i].title
        body = topics[i].body
      }
    }
    content = <Article title={title} body={body}></Article>
  } else if(mode === "Welcome1") {
      content = <Article title="React!" body="React is Good"></Article>
  }

  return (
    <div>
      <Header title="React!!" onClickMode={()=>{setMode("Welcome1");}}></Header>
      <Nav topics={topics} onClickMode={(id)=>{setMode("Read"); setId(id);}}></Nav>
      {content}
    </div>
  );
}

export default App;
