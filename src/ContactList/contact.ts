import {IContact} from "../store/models/IContact";

export function getContacts(letter: string): IContact[] {
    const currentContacts = localStorage.getItem(letter);
    return currentContacts !== null ? JSON.parse(currentContacts) : [];
}