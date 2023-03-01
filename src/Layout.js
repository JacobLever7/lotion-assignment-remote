import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Layout() {
    const [notes, setNotes] = useState([]);

    const newNote = () => {
        setNotes([
            {
                title: `Untitled ${notes.length}`,
                body:   "Body",
                when: "--",
            },
            ...notes,
        ]);
    };

    return (
        <>
            <header>
                <nav className="box">
                    <button className="invis-clickable">&#9776;</button>
                    <h1>Lotion</h1>
                    <button className="invis">&#9776;</button>
                </nav>
            </header>

            <div id = "content">
                <div className="sidebar-header">
                    <div className="left-cont">
                        <div className="header-cont">
                            <div className="left-header-sidebar">
                                <h1>Notes</h1>
                                <button onClick={newNote}>+</button>
                            </div>
                        </div>
                        <div className="header-cont">
                            {notes.length === 0 ? (
                                <p className="note-cont">add a note</p>
                            ): (
                                <ul id="notes-list">
                                    {notes.map((element, idx) => (
                                        <li>
                                            <NavLink to ={`/notes/${idx}`}>
                                                <h4>{element.title}</h4>
                                                <h6>{element.when}</h6>
                                                <p>{element.body}</p>
                                            </NavLink>5
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="right-cont">
                        {/* child components get injected here and replace <outlet /> */}
                        <Outlet context={[notes]}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Layout;