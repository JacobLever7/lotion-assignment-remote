import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ReactQuill from "react-quill";
import uuid from "react-uuid";



import 'react-quill/dist/quill.snow.css';

function Layout() {
    const [notes, setNotes] = useState([]);

    //toggle sidebar state(default is true)
    const [visibility, setVisibility] = useState(true);

    //toggle state
    const visToggle = () => {
        setVisibility((current) => !current);
    };

    const newNote = () => {
        setNotes([
            {
                id: uuid(),
                title: `Untitled ${notes.length}`,
                body: "",
                when: Date.now(),
            },
            ...notes,
        ]);
    };

    const deleteNote = (idToDelete) => {
        setNotes(notes.filter((note) => note.id !== idToDelete));
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
                                                <li key={element.id}>
                                                    <NavLink to ={`/notes/${idx}`}>
                                                        <h4>{element.title}</h4>
                                                        <h6>{new Date(element.when).toLocaleDateString("en-GB", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}</h6>
                                                        <p>{element.body && element.body.substr(0, 100) + "..."}</p>
                                                        <button onClick={() => deleteNote(element.id)}>Delete</button>
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
                            {notes.length !== 0 ? (
                                <>
                                    <div id="header-edit">
                                        <input type="text" id="title-input" autoFocus/>
                                        <input type="datetime-local" />
                                        <button>Save</button>
                                    </div>
                                    
                                    {/* child components get injected here and replace <outlet /> */}
                                    <ReactQuill placeholder= "Write something here..." /*value={notes}*//>
                                </>
                                
                            ): (
                                <div></div>
                            )}  

                            
                        </div>
                </div>
            </div>
        </>
    );
}

export default Layout;