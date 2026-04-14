from fastapi import APIRouter, HTTPException, status
from app.database import db_dependency
from app.schemas import NoteCreate, NoteUpdate, NoteResponse
import app.models as models
from services.ai import explain_note

router = APIRouter(prefix="/notes", tags=["Notes"])

@router.post("/notes", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_notes(note: NoteCreate, db: db_dependency):
    # Using model_dump() for Pydantic V2 compatibility where possible, fallback to dict if necessary
    db_note = models.Note(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get("/notes", response_model=list[NoteResponse])
def get_all_notes(db: db_dependency):
    notes = db.query(models.Note).all()
    return notes

@router.get("/notes/{note_id}", response_model=NoteResponse)
def get_note(note_id: int, db: db_dependency):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    return note

@router.put("/notes/{note_id}", response_model=NoteResponse)
def update_note(note_id: int, note_update: NoteUpdate, db: db_dependency):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    
    note.title = note_update.title
    note.content = note_update.content
    note.explanation = None # Clear explanation on content change
    
    db.commit()
    db.refresh(note)
    return note

@router.delete("/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(note_id: int, db: db_dependency):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    db.delete(note)
    db.commit()
    return None

@router.post("/notes/{note_id}/explain", response_model=NoteResponse)
def explain_note_endpoint(note_id: int, db: db_dependency):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Note not found")
    
    try:
        explanation = explain_note(note.content)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to generate AI explanation: {str(e)}")
        
    note.explanation = explanation
    db.commit()
    db.refresh(note)
    return note
