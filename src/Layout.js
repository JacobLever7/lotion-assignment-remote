import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ReactQuill from "react-quill";
import uuid from "react-uuid";
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';

function Layout() {
    const [notes, setNotes] = useState(
        localStorage.notes ? JSON.parse(localStorage.notes) : []);

    //toggle sidebar state(default is true)
    const [visibility, setVisibility] = useState(true);

    //state for active note
    const [activeNote, setActiveNote] = useState(false);

    //toggle state
    const visToggle = () => {
        setVisibility((current) => !current);
    };

    //find active note
    const getActiveNote = () => {
        return (activeNote === false ? (null) : (notes.find((note) => note.id === activeNote))) 
    }

    let activeNoteData = getActiveNote();

    //state for view mode
    const [viewMode, setViewMode] = useState(false);

    //state for date
    const [date, setDate] = useState((activeNoteData == null ? (""): (moment(activeNoteData.when).format("YYYY-MM-DDTkk:mm"))));
    
    //changeDate function
    const changeDate = event => {
        setDate(event.target.value)
    }


    
    const newNote = () => {
        
        const addNote ={
            id: uuid(),
            title: `Untitled ${notes.length}`,
            body: "",
            when: Date.now(),
        };
        setNotes([addNote, ...notes]);

        setActiveNote(addNote.id);
    };

    const deleteNote = (idToDelete) => {
        const feedback = window.confirm("Are you sure you want to delete this note?");

        if(feedback) {
            setNotes(notes.filter((note) => note.id !== idToDelete)); 
            setActiveNote(false);
        }
        
    }


    return (
        <>
            <header>
                <nav className="box">
                    <button className="invis-clickable" onClick={visToggle}>&#9776;</button>
                    <h1>Lotion</h1>
                    <button className="invis">&#9776;</button>
                </nav>
            </header>

            <div id = "content">
                <div className="sidebar-header">
                    {
                        //if (visibility) then: show the sidebar else: show NULL
                        visibility ? 
                        
                            <div className="left-cont">
                                <div className="header-cont">
                                    <div className="left-header-sidebar">
                                        <h1>Notes</h1>
                                        <button className="add-button" onClick={newNote}>+</button>
                                    </div>
                                </div>
                                <div className="header-cont">
                                    {notes.length === 0 ? (
                                        <p className="note-cont">add a note</p>
                                    ): (
                                        <ul id="notes-list">
                                            {notes.map((element, idx) => (
                                                <li key={element.id} className={`sidebar-note${element.id === activeNote && " active"}`} 
                                                onClick={() => setActiveNote(element.id)}>
                                                    <NavLink to ={`/notes/${idx}`}>
                                                        <h4>{element.title}</h4>
                                                        <h6>{new Date(element.when).toLocaleDateString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}</h6>
                                                        <p>{element.body && element.body.substr(0, 100) + "..."}</p>
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        : null
                    }
                    
                    <div className="right-cont">
                        {activeNote !== false && viewMode === false ? (
                            <>
                                <div id="header-edit">
                                    <div id="title-calendar">
                                        <input type="text" id="title-input" autoFocus value={activeNoteData === null ? (null): (activeNoteData.title) }/>
                                        <input id="calendar-input" type="datetime-local" value={date} onChange={changeDate}/>
                                    </div>
                                    <div id="buttons-edit">
                                        <button className="edit-button" >Save</button>
                                        <button className="edit-button" onClick={() => deleteNote(activeNoteData.id)}>Delete</button>
                                    </div>
                                    
                                </div>
                                
                                {/* child components get injected here and replace <outlet /> */}
                                <ReactQuill  placeholder="Write something here..." value = {activeNoteData === null ? (null): (activeNoteData.body) } /*onChange={setViewMode}*//>
                            </>
                            
                        ): (
                            <h2>Select a note, or create a new one.</h2>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;