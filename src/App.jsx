import React, { useState } from "react";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import { InputTodo } from "./components/InputTodo";

import "./styles.css";

export const App = () => {
  const [todoText, setTodotext] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodeText = (event) => setTodotext(event.target.value);

  // 追加ボタンを押した時の実装
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodotext("");
  };

  // 未完了Todo削除ボタンを押した時の実装
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 未完了Todo完了ボタンを押した時の実装
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos); // 未完了
    setCompleteTodos(newCompleteTodos); // 完了
  };

  // 完了Todo戻すボタンを押した時の実装
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];

    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos); // 完了
    setIncompleteTodos(newIncompleteTodos); // 未完了
  };

  return (
    <>
      <InputTodo
        disabled={incompleteTodos.length >= 5}
        todoText={todoText}
        onChange={onChangeTodeText}
        onClick={onClickAdd}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるtodo５個までだよー。消化しろー。
        </p>
      )}
      <IncompleteTodos
        incompleteTodos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />

      <CompleteTodos completeTodos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
