import { useState } from 'react';
import { ContainerForm, ContainerInput } from './ContactForm.styled';
import PropTypes from 'prop-types';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = event => setName(event.target.value);

  const handleChangeNumber = event => setNumber(event.target.value);

  const resetForm = (name, number) => {
    name.value = '';
    number.value = '';
    setName('');
    setNumber('');
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    const { name, number } = event.target.elements;
    addContact(name.value, number.value);
    resetForm(name, number);
  };

  return (
    <ContainerForm action="" onSubmit={handleOnSubmit}>
      <ContainerInput htmlFor="" name="name">
        Name
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </ContainerInput>
      <ContainerInput htmlFor="" name="number">
        Number
        <input
          value={number}
          onChange={handleChangeNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </ContainerInput>

      <button type="submit">Add contact</button>
    </ContainerForm>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
