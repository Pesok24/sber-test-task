import React, { memo, useCallback, useRef, useState } from "react";
import { db } from "../../db";
import InfiniteScroll from "react-infinite-scroll-component";
import AddDictionary from "./AddDictionary";

// Мне самому не очень нравится, как реализован этот компонент
// Хотел заново его переписать, но времени уже не было
// Считаю, что его можно было сделать на процентов 50 меньше и частично раскидать функционал по другим компонентам

const Dictionary = memo(() => {
  const [dbState, setDbState] = useState(db.slice(0, 20));
  const [filtredState, setFiltredState] = useState([{ name: "", des: "" }]);
  const [hasMore, sethasMore] = useState(true);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");

  let startRef = useRef<HTMLDivElement>(null);

  let timeout: null | ReturnType<typeof setTimeout> = null;

  const executeScroll = () => {
    if (startRef.current) startRef.current.scrollIntoView();
  };

  const cleanFilteredState = useCallback(() => {
    setFiltredState([{ name: "", des: "" }]);
    setInputValue("");
    sethasMore(true);
  }, []);

  const updateDbState = useCallback(
    (reset: boolean) => {
      let filter = filtredState.length > 1 ? filtredState : db;
      if (reset) {
        setFiltredState([{ name: "", des: "" }]);
        filter = db;
      }
      setDbState(filter.slice(0, 20));
      executeScroll();
    },
    [filtredState]
  );

  const searchVal = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(ev.target.value);
    if (timeout) clearTimeout(timeout);
    sethasMore(true);
    timeout = setTimeout(() => {
      if (ev.target.value.length < 1) {
        setError(false)
        updateDbState(true);
        return;
      }
      filterFunc(ev.target.value);
    }, 500);
  };

  const filterFunc = useCallback(
    (text) => {
      setError(false)
      const filter = db.filter((e) =>
        e.name.toLocaleLowerCase().startsWith(text.toLowerCase())
      );
      if (filter.length < 1) return setError(true)
      inputValue.length < 1 && updateDbState(true);
      setDbState(filter.slice(0, 20));
      setFiltredState(filter);
    },
    [inputValue, updateDbState]
  );

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
      filterFunc(inputValue);
      updateDbState(true);
    },
    [filterFunc, inputValue, updateDbState]
  );

  return (
    <>
      <div className="dictionary-wrapper">
        <div className="dictionary-search">
          <input
            type="text"
            placeholder="Ввод..."
            className="dictionary-search-input"
            value={inputValue}
            onChange={searchVal}
          />
        </div>
        <div className="dictionary-list-wrapper" id="dictionary-list-wrapper">
          {error ? <h1 className="dictionary-list-error">Таких справочников нет!</h1> : <InfiniteScroll
            dataLength={dbState.length}
            next={moreData}
            hasMore={hasMore}
            loader={<h4>Загрузка...</h4>}
            scrollableTarget="dictionary-list-wrapper"
          >
            {dbState.map(({ name, des }, i) => {
              const refConf = i === 0 ? startRef : undefined;
              return (
                <div
                  key={name + des + i}
                  className="dictionary-el"
                  ref={refConf}
                >
                  <div className="dictionary-el-index">{i + 1}</div>
                  <div className="dictionary-el-name">{name}</div>
                  <div className="dictionary-el-des">{des}</div>
                  <div className="dictionary-el-button-div">
                    <button onClick={() => deleteEl(name, des)}>Удалить</button>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>}
        </div>
        <AddDictionary
          update={updateDbState}
          cleanFiltredState={cleanFilteredState}
        />
      </div>
    </>
  );
});

export default Dictionary;
