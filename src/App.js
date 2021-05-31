import { Button, TextField } from "@material-ui/core";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { takeRef, addTodo } from "./redux/actions/addTodo";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { db } from "./firebase";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function App() {
  const classes = useStyles();
  const todo = useRef();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.Todo);
  useEffect(() => {
    todos.forEach((todo) => {
      var docRef = db.collection("Todos").doc(todo.TodoDoc);

      const document = docRef.get().then((doc) => {
        if (doc.exists) {
          return doc.data();
        }
      });
      document.then((doc) => {
        const myObj = {
          id: doc.id,
          createdAt: doc.createdAt,
          todo: doc.todo,
        };
        setData([...data, myObj]);
      });
    });
  }, [todos]);

  return (
    <>
      <TextField inputRef={todo}></TextField>
      <Button
        onClick={() => {
          takeRef(todo.current.value).then((data) => {
            dispatch(addTodo(data));
          });
        }}
      >
        Press To Add Data
      </Button>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => {
              return (
                <TableRow key={d.id}>
                  <TableCell component="th" scope="row">
                    {d.id}
                  </TableCell>
                  <TableCell align="right">{d.createdAt}</TableCell>
                  <TableCell align="right">{d.todo}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
