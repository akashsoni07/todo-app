import React, { useEffect, useState } from "react";

function Todo() {
  const [inputItem, setInputItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [items, setItems] = useState(
    localStorage.getItem("todolist")
      ? JSON.parse(localStorage.getItem("todolist"))
      : []
  );

  const submitHandler = (e) => {
    e.preventDefault(e);
    if (!toggleBtn) {
      setItems(
        items.map((item) => {
          if (item.id === isEditItem) {
            return { ...item, name: inputItem };
          }
          return item;
        })
      );
      setToggleBtn(true);
      setInputItem("");
      setIsEditItem(null);
    } else {
      const inputData = {
        id: new Date().getTime().toString(),
        name: inputItem,
      };
      setItems([...items, inputData]);
      setInputItem("");
    }
  };

  const deleteHandler = (id) => {
    const data = items.filter((item) => item.id !== id);
    setItems(data);
  };

  const editHandler = (id) => {
    const editItem = items.find((item) => item.id === id);
    setToggleBtn(false);
    setInputItem(editItem.name);
    setIsEditItem(id);
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(items));
  }, [items]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-center">Todo App</h1>
          <form onSubmit={submitHandler}>
            <div className="form-group" style={{ display: "flex" }}>
              <input
                required
                type="text"
                placeholder="Add item..."
                className="form-control"
                value={inputItem}
                onChange={(e) => setInputItem(e.target.value)}
              />
              {toggleBtn ? (
                <button type="submit" className="btn btn-sm text-white ml-2">
                  Add
                </button>
              ) : (
                <button type="submit" className="btn btn-sm text-white ml-2">
                  Edit
                </button>
              )}
            </div>
          </form>
          {items.map((item) => {
            return (
              <div key={item.id}>
                <p>
                  {item.name}
                  <i
                    onClick={() => deleteHandler(item.id)}
                    className="fas fa-trash-alt ml-2 float-right"
                  ></i>
                  <i
                    onClick={() => editHandler(item.id)}
                    className="fas fa-edit ml-2 float-right"
                  ></i>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Todo;
