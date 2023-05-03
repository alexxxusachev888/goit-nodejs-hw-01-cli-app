const fs = require('fs/promises');
const path = require('path');
const {nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, 'contacts.json');

async function listContacts() {
    const getAllContacts = await fs.readFile(contactsPath);
    return JSON.parse(getAllContacts);
}

async function getContactById(contactId) {
    const contactsList = await listContacts();
    const foundContact = contactsList.find(contact=> contact.id === contactId)
    return foundContact || null;
}

async  function removeContact(contactId) {
    const contactsList = await listContacts();
    const contactIndex = contactsList.findIndex(contact => contact.id === contactId);;
    if(contactIndex === -1){
        return null;
    }

    const [removedContact] = contactsList.splice(contactIndex, 1);
    await fs.writeFile(contactsPath,JSON.stringify(contactsList, null, 2));
    return removedContact;
}

async function addContact(name, email, phone) {
    const contactsList = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contactsList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
    return newContact;
}

  module.exports = {
    listContacts, 
    getContactById, 
    removeContact,
    addContact
  }