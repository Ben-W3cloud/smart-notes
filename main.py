import fastapi
from fastapi import FastAPI
from models import Notes

#create, delete, update, get ( notes -all ,  notes by id)
#notes - id, timestamp, title, content, 
app = FastAPI()

@app.get("/")
def home ():
    return { "name" : "Notes API"}

@app.get("/notes")
async def get_notes():
    return ("nOTES DONT EIST")

@app.get("/notes/{id}")
async def get_notes(id):
    for Note in Notes:
        if Note.id == id:
            return Note.id 
        else:
            return (" Note Doesn't Belong in this store")
        
@app.post("/notes")
def create_notes(notes:Notes):
    return ("Notes has been saved successfully")

@app.put("/notes/{id}")
def update(id):
    if id in Notes.id:
        return ( " Updated succesfully ")
    
@app.delete("/notes/{id}")
def delete(id):
    for Note in Notes:
        if Note.id == id:
            del Note
        else:
            return (" Note no dey")    