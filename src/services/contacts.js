import { ContactsCollection } from '../db/models/Contact.js';

export const getAllContacts = async () => {
  const data = await ContactsCollection.find();
  return data;
};

export const getContactById = async (id) => {
  const data = await ContactsCollection.findById(id);
  return data;
};

export const createContact = async (payload) => {
  const data = await ContactsCollection.create(payload);
  return data;
};

export const patchContact = async (id, payload, options = {}) => {
  const data = await ContactsCollection.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );

  if (!data || !data.value) return null;

  return data.value;
};

export const deleteContact = async (id) => {
  const data = await ContactsCollection.findOneAndDelete({ _id: id });

  return data;
};
