import {IContactList} from "../store/models/IContactList";
import {equalsContact, IContact} from "../store/models/IContact";

export function getContactList(): IContactList[] {
    const jsonCurrentContactList = localStorage.getItem("contacts");
    return jsonCurrentContactList !== null ? JSON.parse(jsonCurrentContactList) : [];
}

export const getContacts = (letter: string, contactList: IContactList[]) => {
    return contactList.find((contact) => contact.letter === letter)?.contacts
}

export const contactInfo = (contact: IContact) => {
    return `Name: ${contact.name}\nJob title: ${contact.jobTitle}\nPhone: ${contact.phoneNumber}\n`
}

export const deleteContact = (currentContactList: IContactList[], deleteContact: IContact): IContactList[] => {
    currentContactList.map(contacts => (
        contacts.contacts = contacts.contacts.filter(contact => !equalsContact(contact, deleteContact))
    ))
    return currentContactList
}

export const addContact = (currentContactList: IContactList[], action: IContact): IContactList[] => {
    const letter = action.name.charAt(0).toLowerCase();
    if (currentContactList.length !== 0) {
        const found: IContactList | undefined = currentContactList.find((contact) => contact.letter === letter)
        if (found) {
            currentContactList.map(contact => (
                contact.letter === letter ? contact.contacts.push(action) : null
            ))
        } else {
            currentContactList.push({letter: letter, contacts: [action]})
        }
    }else {
        currentContactList = [{letter: letter, contacts: [action]}]
    }

    return currentContactList
}

export const initContacts = (contactList: IContactList[]) => {
    const contacts = []
    for (let i = 0; i < contactList.length; i++) {
        for (let j = 0; j < contactList[i].contacts.length; j++) {
            contacts.push(contactList[i].contacts[j]);
        }
    }
    return contacts;
}

export const searchToContactList = (contactList: IContactList[], searchWord: string) => {
    const contacts = []
    if (searchWord !== '') {
        for (let i = 0; i < contactList.length; i++) {
            for (let j = 0; j < contactList[i].contacts.length; j++) {
                if (contactList[i].contacts[j].name.toLowerCase().indexOf(searchWord.toLowerCase()) === 0) {
                    contacts.push(contactList[i].contacts[j])
                }
            }
        }
    }
    return contacts;
}