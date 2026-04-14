/**
 * services/api.js
 * ─────────────────────────────────────────────────────────────
 * API service layer for Smart Notes App.
 *
 * All functions are async placeholders.
 * Replace the bodies with actual fetch / axios calls once
 * the backend base URL is configured.
 *
 * Usage:
 *   import { getNotes, createNote } from '../services/api';
 * ─────────────────────────────────────────────────────────────
 */

// TODO: Replace with your actual API base URL or use an env variable
const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Fetch all notes for the current user.
 * GET /notes
 */
export const getNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

/**
 * Fetch a single note by its ID.
 * GET /notes/:id
 * @param {string|number} id - The note ID
 */
export const getNoteById = async (id) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

/**
 * Create a new note.
 * POST /notes
 * @param {{ title: string, content: string }} data - Note payload
 */
export const createNote = async (noteData) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
};

/**
 * Update an existing note.
 * PUT /notes/:id
 * @param {string|number} id     - The note ID
 * @param {{ title?: string, content?: string }} data - Updated fields
 */
export const updateNote = async (id, data) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update note ${id}`);
  }

  return await response.json();
};

/**
 * Delete a note by ID.
 * DELETE /notes/:id
 * @param {string|number} id - The note ID
 */
export const deleteNote = async (id) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete note ${id}`);
  }

  return await response.json();
};

/**
 * Request AI explanation for a note.
 * POST /notes/:id/explain
 * @param {string|number} id - The note ID
 */

export const explainNote = async (id) => {
  const res = await fetch(`${BASE_URL}/notes/${id}/explain`, { method: 'POST' });
  if (!res.ok) throw new Error(`Failed to explain note ${id}`);
  return res.json();
};
