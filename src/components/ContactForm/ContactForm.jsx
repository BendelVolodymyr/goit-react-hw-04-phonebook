import { useState } from 'react';
import shortid from 'shortid';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerInputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const id = shortid();
    const { name, number } = event.currentTarget;
    const resultSubmit = { name: name.value, number: number.value, id: id };
    onSubmit(resultSubmit);
  };

  return (
    <form className="form__box" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handlerInputChange}
          required
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handlerInputChange}
          required
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
}