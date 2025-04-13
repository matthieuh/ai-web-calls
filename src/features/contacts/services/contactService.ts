import * as fs from 'node:fs';
import { createServerFn } from '@tanstack/react-start';
import { Contact } from '../types/contact';

const contactsFilePath = 'contacts.json';

export async function readContacts(): Promise<Contact[]> {
  try {
    const data = await fs.promises.readFile(contactsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function writeContacts(contacts: Contact[]): Promise<void> {
  await fs.promises.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
}
export const getContacts = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await readContacts();
});

export const addContact = createServerFn({ method: 'POST' })
  .validator((d: Contact) => d)
  .handler(async ({ data }) => {
    const contacts = await readContacts();
    data.id = crypto.randomUUID();
    contacts.push(data);
    await writeContacts(contacts);
    return data;
  });