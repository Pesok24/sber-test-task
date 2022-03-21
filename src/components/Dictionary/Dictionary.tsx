import React, { memo, useCallback, useState } from "react";
import { db } from "../../db";
import InfiniteScroll from "react-infinite-scroll-component";

const Dictionary = memo(() => {
  const [dbState, setDbState] = useState(db.slice(0, 20));
  const [loading, setLoading] = useState(false);

  let timeout: null | ReturnType<typeof setTimeout> = null;

  const searchVal = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout) clearTimeout(timeout);
    setLoading(true);
    timeout = setTimeout(() => {
      if (ev.target.value.length < 1) {
        setDbState(db.slice(0, 20));
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
    const oldLength = dbState.length
    const newLength = oldLength + 20
    setDbState(dbState.concat(db.slice(oldLength, newLength)))
  }, [dbState])


  return (
    <>
      <div className="dictionary-wrapper">
        <div className="dictionary-search">
          <input
            type="text"
            className="dictionary-search-input"
            onChange={searchVal}
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
            <div key={name + des} className="dictionary-el">
              <div className="dictionary-el-index">{i + 1}</div>
              <div className="dictionary-el-name">{name}</div>
              <div className="dictionary-el-des">{des}</div>
            </div>
          ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
});

export default Dictionary;
