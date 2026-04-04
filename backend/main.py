from fastapi import FastAPI, HTTPException
from backend.models import NoteCreate, NoteResponse
from backend.database import get_db_connection
from mysql.connector import Error 

#create, delete, update, get ( notes -all ,  notes by id)
#notes - id, timestamp, title, content, 
app = FastAPI()

@app.get("/")
def home ():
    return { "name" : "Notes API"}

@app.get("/notes", response_model=NoteResponse)
async def get_all_notes():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM notes")
        result = cursor.fetchall()

        cursor.close()
        conn.close()

        return result
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error occurred while fetching notes: {str(e)}")

@app.get("/notes/{id}", response_model=NoteResponse)
async def get_note(id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM notes WHERE id = %s", (id,))
        result = cursor.fetchone()

        if not result:
            raise HTTPException(status_code=404, detail="Note not found")

        cursor.close()
        conn.close()

        return result    
    except Error as e:
          raise HTTPException(status_code=404, detail=f"Error that was found : {str(e)}")

@app.post("/notes")
def create_notes(notes:NoteCreate):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = "INSERT INTO notes (title, content) VALUES (%s, %s)"
        values = (notes.title, notes.content)

        cursor.execute(query,values)
        conn.commit()

        cursor.close()
        conn.close()
        return { "message" : "Note has been created successfully" }
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error that was found : {str(e)}")

@app.put("/notes/{id}")
def update(id:int, notes:NoteCreate):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        query = """UPDATE notes SET title = %s, content = %s WHERE id = %s"""
        values = (notes.title, notes.content, id)

        cursor.execute(query,values)
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Note not found")

        cursor.close()
        conn.close()

        return { "messsage" : "NOTE has been updated successfully"}
    
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error that was found : {str(e)}")    

@app.delete("/notes/{id}")
def delete_notes(id:int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("DELETE FROM notes WHERE id = %s", (id,))
        conn.commit()

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Note not found")

        cursor.close()
        conn.close()
        return { "message" : "Note has been deleted successfully" }
    except Error as e:
        raise HTTPException(status_code=500, detail=f"Error that was found : {str(e)}")    