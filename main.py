import fastapi
from fastapi import FastAPI
from models import Notes
from notes import notes

#create, delete, update, get ( notes -all ,  notes by id)
#notes - id, timestamp, title, content, 
app = FastAPI()

@app.get("/")
def home ():
    return { "name" : "Notes API"}

@app.get("/notes")
async def get_notes():
    total = len(notes)
    return {"message": f"A total of {total} notes have been retrieved successfully"}

@app.get("/notes/{id}")
async def get_notes(id:str):
    for note in notes:
        if note[id] == id:
            return note 
        else :
            return {"message": f"Note of id {id} is not in this store"}

@app.post("/notes")
def create_notes(notes:Notes):
    for note in notes:
        if note[id] == notes[id]:
            return {"message" : "id has been taken already"}
        else :
            notes.add(note)
            return {"message": "Notes has been saved successfully"}

@app.put("/notes/{id}")
def update(id:int):
    return {"message": f"Note of  id {id} updated successfully"}

@app.delete("/notes/{id}")
def delete(id:int):
    return {"message": f"Note of id {id} deleted successfully"}    