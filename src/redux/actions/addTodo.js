import { v4 as uuid_v4 } from "uuid";
import moment from "moment";
import { db } from "../../firebase";

const ADDTODO = "ADDTODO";

export async function takeRef(todo) {
  const id = uuid_v4();
  const time = moment().format("MMM Do YY");
  const response = await db
    .collection("Todos")
    .add({
      id: id,
      createdAt: time,
      todo: todo,
    })
    .then((doc) => {
      return doc.id;
    });

  return { doc: response };
}

export const addTodo = (data) => {
  return { type: ADDTODO, payload: data };
};
