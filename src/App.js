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
    let topics = props.topics[i];
    list.push(<li key={topics.id}><a id={topics.id} href={"/"+topics.id} onClick={(event)=>{
      event.preventDefault();
      props.onClickMode(Number(event.target.id));
    }}>{topics.title}</a></li>)
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
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>새로운 리스트 생성</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title, body);
      }}>
        <input type="text" name="title"></input><br></br>
        <textarea name="body"></textarea><br></br>
        <input type="submit" value="등록"></input>
      </form>
    </article>
  );
}

function App() {

  const [mode, setMode] = useState("Welcome");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);


  const [topics, setTopics] = useState([
    {id:1, title:"html", body:"html is Good"}, 
    {id:2, title:"css", body:"css is Good"}, 
    {id:3, title:"javascript", body:"javascript is Good"}
  ]);

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
  } else if(mode === "Create") {
      content = <Create onCreate={(title, body) => {
        const newTopic = {id:nextId, title:title, body:body}
        setId(nextId);
        setNextId(nextId+1);
        const newTopics = [...topics]
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode("Read");
      }}></Create>
  }

  return (
    <div>
      <Header title="React!!" onClickMode={()=>{setMode("Welcome1");}}></Header>
      <Nav topics={topics} onClickMode={(id)=>{setMode("Read"); setId(id);}}></Nav>
      {content}
      <a href="/create" onClick={(event)=>
        {
          event.preventDefault();
          setMode("Create");
        }}>New List Create</a>
    </div>
  );
}

export default App;
