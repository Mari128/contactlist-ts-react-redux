import {useInput} from "../hooks/useInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {contactSlice} from "../store/reducers/ContactSlice";
import {Box, Modal, Typography} from "@mui/material";
import {ChangeEvent, MutableRefObject, useRef, useState} from "react";
import {IContact} from "../store/models/IContact";
import {IContactList} from "../store/models/IContactList";
import {contactInfo, initContacts, searchToContactList} from "../ContactList/contactList";
import classes from "./button.module.css";
import './contact-info.css'
import './modal-search.css'


export default function ContactInfoSection() {
    const style = {
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };

    const name = useInput("", "name");
    const jobTitle = useInput("", "jobTitle");
    const phoneNumber = useInput("", "phoneNumber");

    const editName = useInput("", "editName");
    const editJobTitle = useInput("", "editJobTitle");
    const editPhoneNumber = useInput("", "editPhoneNumber");

    const [open, setOpen] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    let contactList = useAppSelector(state => state.contact.contactList)

    const [isActive, setIsActive] = useState(false);
    const [searchContacts, setSearchContacts] = useState<IContact[]>(initContacts(contactList));
    const divRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch()

    const {addContact} = contactSlice.actions;
    const {deleteContact} = contactSlice.actions;
    const {editContactList} = contactSlice.actions;
    const {clearContactList} = contactSlice.actions;

    const handleCloseSearchModal = () => setOpen(false);

    const handleOpen = () => {
        setOpen(true);
        setIsActive(false);
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
    }

    const handleEdit = (contact: IContact) => {
        setOpenEditModal(true);
        editName.setValue(contact.name);
        editJobTitle.setValue(contact.jobTitle);
        editPhoneNumber.setValue(contact.phoneNumber);
    }

    const handleClearContactList = () => {
        dispatch(clearContactList([]))
    }

    const handleDeleteSubmit = (contact: IContact): void => {
        dispatch(deleteContact(contact))
    }

    const handleSaveSubmit = (contactOld: IContact, contactNew: IContact): void => {
        dispatch(editContactList([contactOld, contactNew]))
        setSearchContacts([contactNew])
        setOpenEditModal(false);
    }

    const handleAddSubmit = () => {
        const isValid = !name.error && !jobTitle.error && !jobTitle.error;

        if (isValid) {
            dispatch(addContact({name: name.value, jobTitle: jobTitle.value, phoneNumber: phoneNumber.value}))
            name.setValue('');
            jobTitle.setValue('');
            phoneNumber.setValue('');
        }
    }

    const handleClickShowAll = () => {
        setSearchContacts(initContacts(contactList))
        setIsActive(true)
    };

    const handleSearchToContactList = (contactList: IContactList[], searchWord: string) => {
        setIsActive(true)
        setSearchContacts(searchToContactList(contactList, searchWord))
    }

    return (
        <div className="input-container">
            <div className="contact-field">
                <input onChange={e => name.onChange(e)} value={name.value}
                       className='name' placeholder='Name'/>
                {name.error && <span className="error">{name.error}</span>}
            </div>
            <div className="contact-field">
                <input onChange={e => jobTitle.onChange(e)} value={jobTitle.value}
                       className='jobTitle' placeholder='Job Title'/>
                {jobTitle.error && <span className="error">{jobTitle.error}</span>}
            </div>
            <div className="contact-field">
                <input onChange={e => phoneNumber.onChange(e)} value={phoneNumber.value}
                       className='phoneNumber' placeholder='Phone (+x xxx xxx xx xx)'/>
                {phoneNumber.error && <span className="error">{phoneNumber.error}</span>}
            </div>

            <input type="button" className={`${classes.button} ${classes.active}`} value='Add'
                   onClick={handleAddSubmit}/>
            <input type="button" className={`${classes.button} ${classes.active}`} value='Clear List'
                   onClick={handleClearContactList}/>
            <input type="button" className={`${classes.button} ${classes.active}`} value='Search'
                   onClick={handleOpen}/>

            <Modal
                open={open}
                onClose={handleCloseSearchModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="search-container__item" sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h1">
                        Search contact
                    </Typography>
                    <input type="text" placeholder="Search..." className="search-input" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleSearchToContactList(contactList, e.target.value)
                    }}/>
                    <div className="search-output" ref={divRef}>
                        {(searchContacts.length > 0) && searchContacts.map(contact => (
                                <div className={isActive ? 'letter__info letter__info_active' : 'letter__info'}
                                     style={{whiteSpace: 'pre-wrap'}}>
                                    {contactInfo(contact)}
                                    <div className="contact_icons">
                                        <i className="fa fa-edit contact__edit"
                                           onClick={() => handleEdit(contact)}></i>
                                        {openEditModal && <Modal
                                            open={openEditModal}
                                            onClose={handleCloseEditModal}
                                            aria-labelledby="child-modal-title"
                                            aria-describedby="child-modal-description"
                                        >
                                            <Box className="edit-contact-container__item" sx={{...style}}>
                                                <Typography id="modal-modal-title" variant="h6" component="h1">
                                                    Edit contact:
                                                </Typography>
                                                <div className="edit__contact-field">
                                                    <input onChange={e => editName.onChange(e)} value={editName.value}
                                                           className='editName' placeholder='Name'/>
                                                    {editName.error && <span className="error">{editName.error}</span>}
                                                </div>
                                                <div className="edit__contact-field">
                                                    <input onChange={e => editJobTitle.onChange(e)}
                                                           value={editJobTitle.value}
                                                           className='editJobTitle' placeholder='Job Title'/>
                                                    {editJobTitle.error &&
                                                        <span className="error">{editJobTitle.error}</span>}
                                                </div>
                                                <div className="edit__contact-field">
                                                    <input onChange={e => editPhoneNumber.onChange(e)}
                                                           value={editPhoneNumber.value}
                                                           className='editPhoneNumber'
                                                           placeholder='Phone (+x xxx xxx xx xx)'/>
                                                    {editPhoneNumber.error &&
                                                        <span className="error">{editPhoneNumber.error}</span>}
                                                </div>
                                                <input type="submit" className="edit-save" id="btn__edit-save" value="Save"
                                                       onClick={() => handleSaveSubmit(contact, {
                                                           name: editName.value,
                                                           jobTitle: editJobTitle.value,
                                                           phoneNumber: editPhoneNumber.value
                                                       })}/>
                                                <i className="fa fa-times-circle edit-close" aria-hidden="true"
                                                   onClick={handleCloseEditModal}></i>
                                            </Box>
                                        </Modal>}
                                        <i className="fa fa-times-circle contact__delete"
                                           onClick={() => handleDeleteSubmit(contact)}></i>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <input type="submit" className="search-show-all" id="btn__search-show-all"
                           value={'Show All'} onClick={handleClickShowAll}/>
                    <i className="fa fa-times-circle search-close" aria-hidden="true"
                       onClick={handleCloseSearchModal}></i>
                </Box>
            </Modal>
        </div>
    )
}