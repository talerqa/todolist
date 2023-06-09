import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type SuperInputType = {
  callback: (title: string) => void
  placeholder: string
}

const AddItemForm = (props: SuperInputType) => {
const AddItemForm = (props: SuperInputType) => {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  }
  const addTask = () => {
    let newTitle = title.trim();
    if (newTitle !== '') {
      props.callback(newTitle);
      setTitle('');
    } else {
      setError('Title is required');
    }
  }

  const muiStylesButton = {
    maxWidth: '39px',
    maxHeight: '39px',
    minWidth: '39px',
    minHeight: '39px',
    backgroundColor: 'black'
  }
  return (
    <div>



      <TextField size={'small'}
                 value={title}
                 error={!!error}
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 id={error ? "outlined-error" : "outlined-basic"}
                 label={error ? "Type out smthg" : props.placeholder}
                 variant="outlined"

      />


      <Button onClick={addTask}
              variant="contained"
              style={muiStylesButton}
      >+</Button>
      {/*{error && <div className="error-message">{error}</div>} */}
    </div>
  );
};

export default AddItemForm;