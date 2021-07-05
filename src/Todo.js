import React from 'react';
import { useEffect, useState, useCallback } from 'react';

const Todo = () => {
  const [input, setInput] = useState('');
  const [task, setTask] = useState([]);
  const [id, setId] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [createdTaskCount, setCreatedTaskCount] = useState(0);
  const [, updateState] = useState();

  function handleChange(e) {
    setInput(e.target.value);
  }

  const forceUpdate = useCallback(() => updateState({}), []);

  function sortTask() {
    let x = task;
    setTask(
      x.sort((a, b) => {
        return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
      })
    );
    forceUpdate();
  }
  async function submitHandler(e) {
    e.preventDefault();

    if (input) {
      setTask([...task, { name: input, completed: false, id: id }]);
      setInput('');
      setId(id + 1);
      setCreatedTaskCount(createdTaskCount + 1);
    }
  }

  useEffect(() => {
    let x = task.filter(d => d.completed === true);
    console.log(x);
    setTaskCount(x.length);
  }, [task]);

  function completeTask(id) {
    setTask(
      task.map(data => {
        if (data.id === id) {
          data.completed = !data.completed;
          if (data.completed) setTaskCount(taskCount + 1);
          else setTaskCount(taskCount - 1);
        }
        return data;
      })
    );
  }

  function removeTask(id) {
    setCreatedTaskCount(
      task.map(data => {
        if (data.id === id) return taskCount - 1;
      })
    );
    setTask(task.filter(data => data.id !== id));
    setCreatedTaskCount(createdTaskCount - 1);
  }

  function modifyTask(id) {
    setTask(
      task.map(data => {
        if (data.id === id) {
          data.name = input;
        }
        return data;
      })
    );
  }

  useEffect(() => {
    sortTask();
  }, [task]);

  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'cursive',
        backgroundColor: '#7E57C2 ',
        width: '400px',
        margin: '0 auto',
        border: '2px dashed maroon ',
        borderRadius: '10px'
      }}
    >
      <h1 id="title" style={{ textAlign: 'center', color: '#AD1457 ' }}>
        to-do-list
      </h1>
      <form style={{ textAlign: 'center' }}>
        <input type="text" value={input} onChange={handleChange} />
        <button
          type="submit"
          onClick={submitHandler}
          style={{
            color: 'white',
            backgroundColor: '#7E57C2',
            border: '1px solid white',
            margin: '1px',
            padding: '10px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </form>
      <h1 style={{ color: '#283747' }}>Created Task {createdTaskCount}</h1>
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'sans-serif',
          backgroundColor: 'lightgrey',
          width: '275px',
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'lightslategray',
          margin: '0 auto'
        }}
      >
        {task.length > 0 ? (
          task.map((data, i) => (
            <div
              style={{
                background: '#7E57C2',
                margin: '0 auto',
                color: 'yellow'
              }}
              key={data.id}
            >
              {data.name}{' '}
              <button
                style={{
                  border: '1px solid yellow',
                  borederRadius: '20%',
                  margin: '1px',
                  padding: '10px',
                  cursor: 'pointer',
                  color: 'yellow',
                  backgroundColor: '#7E57C2'
                }}
                onClick={() => {
                  completeTask(data.id);
                }}
              >
                {!data.completed ? <span>complete</span> : <span>Restart</span>}
              </button>
              <button
                style={{
                  border: '1px solid yellow',
                  borederRadius: '20%',
                  margin: '1px',
                  padding: '10px',
                  cursor: 'pointer',
                  color: 'yellow',
                  backgroundColor: '#7E57C2'
                }}
                onClick={() => {
                  modifyTask(data.id);
                }}
              >
                modify
              </button>
              <button
                style={{
                  border: '1px solid yellow',
                  borederRadius: '20%',
                  margin: '1px',
                  padding: '10px',
                  cursor: 'pointer',
                  color: 'yellow',
                  backgroundColor: '#7E57C2'
                }}
                onClick={() => {
                  removeTask(data.id);
                }}
              >
                remove
              </button>
            </div>
          ))
        ) : (
          <p />
        )}
      </div>
      <hr />
      <h1>Completed Tasks: {taskCount}</h1>
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'sans-serif',
          backgroundColor: 'lightgrey',

          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'lightslategray',
          margin: '0 auto',
          position: 'inline'
        }}
      >
        {task ? (
          task.map((data, i) => {
            if (data.completed) {
              return (
                <div
                  style={{
                    color: 'orange',
                    background: 'white',
                    padding: '5px',
                    background: '#7E57C2'
                  }}
                  key={data.id}
                >
                  {data.name}
                </div>
              );
            }
          })
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};
export default Todo;
