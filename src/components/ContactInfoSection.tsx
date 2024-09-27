import {useInput} from "../hooks/useInput";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {contactSlice} from "../store/reducers/ContactSlice";
import './contact-info.css'
import classes from "./button.module.css";


export default function ContactInfoSection() {
    const name = useInput("", "name");
    const jobTitle = useInput("", "jobTitle");
    const phoneNumber = useInput("", "phoneNumber");

    const dispatch = useAppDispatch();
    const {addContact} = contactSlice.actions;
    const contact = useAppSelector(state => state.contact.contacts);

    console.log(contact)
    const handleAddSubmit = () => {
        const isValid = !name.error && !jobTitle.error && !jobTitle.error;

        if (isValid) {
            dispatch(addContact({name: name.value, jobTitle: jobTitle.value, phoneNumber:phoneNumber.value}))
            name.setValue('');
            jobTitle.setValue('');
            phoneNumber.setValue('');
        }
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

            <input type="button" className={`${classes.button} ${classes.active}`} value='Add' onClick={handleAddSubmit}/>
            <input type="button" className={`${classes.button} ${classes.active}`} value='Clear List'/>
            <input type="button" className={`${classes.button} ${classes.active}`} value='Search'/>
        </div>
    )
}