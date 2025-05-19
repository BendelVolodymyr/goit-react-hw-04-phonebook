import { useState } from 'react';
import { ContactFormProps } from 'type/ContactForm';
import { nanoid } from 'nanoid';
import styled from './ContactForm.module.scss';

// @ts-ignore
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultSubmit = {
      id: nanoid(),
      name,
      number: phone.replace(/(\d{3})(?=\d)/g, '$1-'),
    };

    onSubmit(resultSubmit);
    setName('');
    setPhone('');
  };

  const isDisabled =
    name.trim() === '' || phone.replace(/\D/g, '').length !== 12;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className={styled['form__label']}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handlerInputChange}
          required
        />
      </label>

      <label className={styled['form__label']}>
        Number
        <div style={{ position: 'relative', left: 0, top: 0 }}>
          <PhoneInput
            country={'ua'}
            onlyCountries={['ua', 'cz']}
            value={phone}
            onChange={setPhone}
            placeholder="+(XXX) XX XXX XXXX"
            inputProps={{ name: 'phone', required: true }}
          />
        </div>
      </label>

      <button
        className={styled['form__button']}
        type="submit"
        disabled={isDisabled}
      >
        Add Contact
      </button>
    </form>
  );
}
