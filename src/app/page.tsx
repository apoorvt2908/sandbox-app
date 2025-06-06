'use client'

import React from "react";
import { useState } from "react";
import { useEffect } from "react";


interface Note{
  id: string;
  title: string;
  content: string
}

export default function Home(){

const[notes, setNotes] = useState<Note[]>([]);


useEffect(() => {
const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
setNotes(storedNotes);
}, [])

const deleteNote = (id: string) => {
  const updatedNotes = notes.filter(note => note.id !== id);
  setNotes(updatedNotes);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

return(
  <div className="container ">
    {notes.length === 0 ?(
<div>Loading......</div>
    ):(
      <div>

        {notes.map(note => (
          <div key={note.id} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
        </div>
    )}
  </div>
)
}