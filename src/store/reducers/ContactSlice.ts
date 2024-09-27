import {IContact} from "../models/IContact";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getContacts} from "../../ContactList/contact";

interface ContactState {
    contacts: IContact[];
    letter: string;
    count: number;
}

const initialState: ContactState = {
    contacts: [],
    letter: '',
    count: 0,
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        addContact(state, action: PayloadAction<IContact>) {
            state.letter = action.payload.name.charAt(0).toLowerCase();
            state.contacts = getContacts(state.letter);
            state.contacts.push(action.payload);
            localStorage.setItem(state.letter, JSON.stringify(state.contacts));
        },
        getContact(state, action: PayloadAction<string>) {
            state.contacts = getContacts(action.payload);
            state.count = state.contacts.length;
        }
    }
})

export default contactSlice.reducer;