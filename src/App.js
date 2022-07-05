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

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  
  return (
    <article>
      <h2>내용수정</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title, body);
      }}>
        <input type="text" name="title" value={title} onChange={(event)=>{setTitle(event.target.value)}}></input><br></br>
        <textarea name="body" value={body} onChange={(event)=>{setBody(event.target.value)}}></textarea><br></br>
        <input type="submit" value="수정"></input>
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
  let controlText = null;

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

    controlText = <>
      <a href="/update" onClick={(event)=>{
      event.preventDefault();
      setMode('Update');
      }}>Update</a><br/>
      <a href='/delete' onClick={
        const newTopics = []
      }>Delete</a>
      </>

  } else if(mode === "Welcome1") {
      content = <Article title="React!" body="React is Good"></Article>
  } else if(mode === "Create") {
      content = <Create onCreate={(title, body) => {
        const newTopic = {id:nextId, title:title, body:body}
        setId(nextId);
        setNextId(nextId+1);
        const newTopics = [...topics] // 기존 배열 복사
        newTopics.push(newTopic);
        setTopics(newTopics);
        setMode("Read");
      }}></Create>
  } else if(mode === "Update") {
      let title, body = null;
      for(let i=0;i<topics.length;i++){
        if(topics[i].id === id) {
          title = topics[i].title
          body = topics[i].body
        }
      }
      content = <Update title={title} body={body} onUpdate={(title, body)=>{
        const newTopics = [...topics] //spread 문법 기존의 배열값 복사
        const updateTopic = {id:id, title:title, body:body} // 사용자가 수정한 값으로 만든 토픽

        for(let i=0;i<newTopics.length;i++) {
          if(newTopics[i].id === id){
            newTopics[i] = updateTopic;
            break;
          }
        }

        setTopics(newTopics);
        setMode("Read");
      }}></Update>
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
        }}>New List Create</a><br></br>
        {controlText}
    </div>
  );
}

export default App;
