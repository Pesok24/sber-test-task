import React, { memo, useCallback, useState } from "react";
import { db } from "../../db";

interface AddDictionaryProps {
  update: (reset: boolean) => void
}

const AddDictionary = memo<AddDictionaryProps>(({ update }) => {

  const [formState, setFormState] = useState({
    textInput: "",
    textAreaInput: "",
  });

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = ev.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
  
  const handleClick = useCallback((ev: React.MouseEvent) => {
    const { textInput, textAreaInput } = formState
    db.unshift({ name: textInput, des: textAreaInput })
    update(false)
  }, [formState, update])

  return (
    <>
    <div className="addDictionary-wrapper">
    <div className="addDictionary-div-el">
      <p className="addDictionary-text">Введите заголовок:</p>
      <input type="text" className="addDictionary-input" name="textInput" onChange={handleChange}/>
    </div>
    <div className="addDictionary-div-el">
      <p className="addDictionary-text">Введите описание:</p>
      <textarea className="addDictionary-textarea" name="textAreaInput" onChange={handleChange}></textarea>
    </div>
    <button type="submit" onClick={handleClick}>Добавить</button>
    </div>
    </>
  );
});

export default AddDictionary;
