import {IContact} from "../models/IContact";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IContactList} from "../models/IContactList";
import {addContact, deleteContact, getContactList} from "../../ContactList/contactList";

interface ContactListState {
    contactList: IContactList[];
}

const initialState: ContactListState = {
    contactList: [],
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact(state, action: PayloadAction<IContact>) {
            let currentContactList = addContact(getContactList(), action.payload)
            state.contactList = currentContactList;
            localStorage.setItem("contacts", JSON.stringify(currentContactList));
        },
        initContactList(state, action: PayloadAction<string | null>) {
            state.contactList = action.payload !== null ? JSON.parse(action.payload) : [];
        },
        deleteContact(state, action: PayloadAction<IContact>) {
            let currentContactList = deleteContact(getContactList(), action.payload)
            state.contactList = currentContactList
            localStorage.setItem("contacts", JSON.stringify(currentContactList));
        },
        editContactList(state, action: PayloadAction<[IContact, IContact]>) {
            let currentContactList = deleteContact(getContactList(), action.payload[0]);
            currentContactList = addContact(currentContactList, action.payload[1]);
            state.contactList = currentContactList;
            localStorage.setItem("contacts", JSON.stringify(currentContactList));
        },
        clearContactList(state, action: PayloadAction<IContactList[]>) {
            state.contactList = action.payload;
            localStorage.setItem("contacts", JSON.stringify(action.payload));
        },
    }
})

export default contactSlice.reducer;