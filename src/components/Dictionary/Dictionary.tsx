import React, { memo, useCallback, useRef, useState } from "react";
import { db } from "../../db";
import InfiniteScroll from "react-infinite-scroll-component";
import AddDictionary from "./AddDictionary";

const Dictionary = memo(() => {
  const [dbState, setDbState] = useState(db.slice(0, 20));
  const [filtredState, setFiltredState] = useState([{ name: "", des: "" }]);
  const [hasMore, sethasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");

  let timeout: null | ReturnType<typeof setTimeout> = null;

  const updateDbState = useCallback(
    (reset: boolean) => {
      let filter = filtredState.length > 1 ? filtredState : db;
      if (reset) {
        setFiltredState([{ name: "", des: "" }]);
        filter = db;
      }
      console.log(filter);
      setDbState(filter.slice(0, 20));
    },
    [filtredState]
  );

  const filterFunc = useCallback(() => {
    const filter = db.filter((e) =>
      e.name.toLocaleLowerCase().startsWith(inputValue.toLowerCase())
    );
    inputValue.length < 1 && updateDbState(true);
    setDbState(filter.slice(0, 20));
    setFiltredState(filter);
  }, [inputValue, updateDbState]);

  const searchVal = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
    if (timeout) clearTimeout(timeout);
    sethasMore(true);
    timeout = setTimeout(() => {
      if (ev.target.value.length < 1) {
        updateDbState(true);
        return;
      }
      filterFunc();
    }, 500);
  };

  const moreData = useCallback(() => {
    const filter = filtredState.length > 1 ? filtredState : db;
    const oldLength = dbState.length;
    const newLength = oldLength + 20;
    if (newLength >= filter.length) sethasMore(false);
    setDbState(dbState.concat(filter.slice(oldLength, newLength)));
  }, [dbState, filtredState]);

  const deleteEl = useCallback(
    (name, des) => {
      const index = db.findIndex((e) => {
        const currentValue = e.name + e.des;
        const searchValue = name + des;
        return currentValue === searchValue;
      });
      db.splice(index, 1);
      setInputValue("");
      filterFunc()
      updateDbState(false);
    },
    [filterFunc, updateDbState]
  );

  return (
    <>
      <div className="dictionary-wrapper">
        <div className="dictionary-search">
          <input
            type="text"
            className="dictionary-search-input"
            value={inputValue}
            onChange={searchVal}
          />
        </div>
        <div className="dictionary-list-wrapper" id="dictionary-list-wrapper">
          <InfiniteScroll
            dataLength={dbState.length}
            next={moreData}
            hasMore={hasMore}
            loader={<h4>Загрузка...</h4>}
            scrollableTarget="dictionary-list-wrapper"
          >
            {dbState.map(({ name, des }, i) => (
              <div key={name + des + i} className="dictionary-el">
                <div className="dictionary-el-index">{i + 1}</div>
                <div className="dictionary-el-name">{name}</div>
                <div className="dictionary-el-des">{des}</div>
                <div className="dictionary-el-button-div">
                  <button onClick={() => deleteEl(name, des)}>Удалить</button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <AddDictionary update={updateDbState} />
      </div>
    </>
  );
});

export default Dictionary;
