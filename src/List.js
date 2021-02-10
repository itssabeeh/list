import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const List = () => {
  const [item, setItem] = useState({ id: 0, title: "" });
  const [itemList, setItemList] = useState([]);
  const [itemId, setItemId] = useState(1);
  const [isEdit, setIsEdit] = useState(false);
  const [index, setIndex] = useState(0);
  const [isPositive, setIsPositive] = useState(false);
  const [message, setMessage] = useState("");
  document.title = "Grocery List";
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      itemList[index].title = item.title;
      setItem({ ...item, title: "" });
      setIsPositive(true);
      setNotification("Value changed");
    } else {
      setItemId(itemId + 1);
      setItemList([...itemList, item]);
      setIsPositive(true);
      setNotification("Item added to the list");
      setItem({ ...item, title: "" });
    }
    setIsEdit(false);
  };
  const setNotification = (note) => {
    setMessage(note);
    setTimeout(() => {
      setMessage("");
    }, 2000);
    clearTimeout();
  };
  const handleDelete = (id) => {
    const newItemList = itemList.filter((element) => element.id !== id);
    setItemList(newItemList);
    setIsPositive(false);
    setNotification("Item Removed");
  };
  const handleEdit = (id, i) => {
    setIsEdit(true);
    setItem(itemList.find((element) => id === element.id));
    setIndex(i);
  };

  return (
    <div className="container">
      <article style={{ paddingTop: "1.5rem" }}>
        {isPositive ? (
          <div className="notification" style={{ backgroundColor: "#50C878" }}>
            {message}
          </div>
        ) : (
          <div className="notification" style={{ backgroundColor: "#ff6961" }}>
            {message}
          </div>
        )}
      </article>

      <article>
        <h1>Grocery List</h1>
        <form className="list-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              style={{ width: "30vw" }}
              type="text"
              placeholder="e.g eggs"
              value={item.title}
              onChange={(e) =>
                setItem({
                  id: itemId,
                  title: e.target.value,
                })
              }
            />
          </div>
          {isEdit ? (
            <button type="submit" className="btn">
              Edit
            </button>
          ) : (
            <button
              type="submit"
              style={{ backgroundColor: "#B0C4DE", border: "none" }}
              className="btn"
            >
              Submit
            </button>
          )}
        </form>
      </article>
      <article>
        {itemList.map((items, i) => {
          return (
            <article key={items.id}>
              <div className="item-container" style={{ padding: "1rem" }}>
                <h4 style={{ margin: "0" }}>{items.title}</h4>
                <div>
                  <button
                    className="btn-edit btn"
                    onClick={() => handleEdit(items.id, i)}
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    className="btn-delete btn"
                    onClick={() => handleDelete(items.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
        <button
          className="btn-deleteAll btn"
          style={{
            color: "red",
            marginBottom: "1rem",
            border: "none",
            backgroundColor: "transparent",
          }}
          onClick={() => {
            setIsPositive(false);
            setNotification("Empty List");
            setItemList([]);
          }}
        >
          Clear items
        </button>
      </article>
    </div>
  );
};

export default List;
