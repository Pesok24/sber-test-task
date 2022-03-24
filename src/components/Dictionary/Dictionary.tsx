import React, { memo, useCallback, useState } from "react";
import { db } from "../../db";
import InfiniteScroll from "react-infinite-scroll-component";
import AddDictionary from "./AddDictionary";

const Dictionary = memo(() => {
  const [dbState, setDbState] = useState(db.slice(0, 20));
  const [loading, setLoading] = useState(false);
  const [hasMore, sethasMore] = useState(false);

  let timeout: null | ReturnType<typeof setTimeout> = null;

  const updateDbState = useCallback(() => {
    setDbState(db.slice(0, 20));
  }, []);

  const searchVal = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);
    setLoading(true);
    timeout = setTimeout(() => {
      if (ev.target.value.length < 1) {
        updateDbState();
        setLoading(false);
        return;
      }
      setDbState(
        db.filter((e) =>
          e.name.toLocaleLowerCase().startsWith(ev.target.value.toLowerCase())
        )
      );
      setLoading(false);
    }, 700);
  };

  const moreData = useCallback(() => {
    const oldLength = dbState.length;
    const newLength = oldLength + 20;
    setDbState(dbState.concat(db.slice(oldLength, newLength)));
  }, [dbState]);

  const deleteEl = useCallback(
    (name, des) => {
      const index = db.findIndex((e) => {
        const currentValue = e.name + e.des;
        const searchValue = name + des;
        return currentValue === searchValue;
      });
      db.splice(index, 1);
      updateDbState();
    },
    [updateDbState]
  );

  return (
    <>
      <div className="dictionary-wrapper">
        <div className="dictionary-search">
          <input
            type="text"
            className="dictionary-search-input"
            onChange={searchVal}
            placeholder='Ввод...'
          />
        </div>
        <div className="dictionary-list-wrapper" id="dictionary-list-wrapper">
          <InfiniteScroll
            dataLength={dbState.length}
            next={moreData}
            hasMore={true}
            loader={<h4>Загрузка...</h4>}
            scrollableTarget="dictionary-list-wrapper"
          >
            {dbState.map(({ name, des }, i) => (
              <div key={name + des + i} className="dictionary-el">
                <div className="dictionary-el-index">{i + 1}</div>
                <div className="dictionary-el-name">{name}</div>
                <div className="dictionary-el-des">{des}</div>
                <div className="dictionary-el-button-div">
                  <button className="dictionary-el-button" onClick={() => deleteEl(name, des)}>Удалить</button>
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
