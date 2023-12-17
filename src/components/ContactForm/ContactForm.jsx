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

// const LOCAL_KEY = 'inputValue';

// class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//     id: '',
//   };

//   componentDidMount() {}

//   reset = () => {
//     this.setState({ name: '', number: '', id: '' });
//   };

//   handlerInputChange = event => {
//     const { name, value } = event.currentTarget;
//     this.setState({ id: shortid(), [name]: value });
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     this.props.onSubmit(this.state);
//     this.reset();
//   };
//   render() {
//     return (
//       <form className="form__box" onSubmit={this.handleSubmit}>
//         <label>
//           Name
//           <input
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.handlerInputChange}
//             required
//           />
//         </label>
//         <label>
//           Number
//           <input
//             type="tel"
//             name="number"
//             value={this.state.number}
//             onChange={this.handlerInputChange}
//             required
//           />
//         </label>
//         <button type="submit">Add Contact</button>
//       </form>
//     );
//   }
// }
