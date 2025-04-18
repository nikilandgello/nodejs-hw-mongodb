import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  patchContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/ParsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts({
    userId: req.user._id,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(req.user._id, contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const data = await createContact(req.body, req.user._id);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: data,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await patchContact(req.user._id, contactId, req.body);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await deleteContact(req.user._id, contactId);

  if (!data) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
