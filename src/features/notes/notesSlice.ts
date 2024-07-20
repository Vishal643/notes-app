import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
	id: string;
	title?: string;
	content: string;
	pinned: boolean;
	backgroundColor?: string;
	imageUrl?: string; // Add imageUrl property
}

interface NotesState {
	notes: Note[];
}

const initialState: NotesState = {
	notes: [],
};

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<Note>) => {
			state.notes.push(action.payload);
		},
		deleteNote: (state, action: PayloadAction<string>) => {
			state.notes = state.notes.filter((note) => note.id !== action.payload);
		},
		editNote: (state, action: PayloadAction<Note>) => {
			const { id, title, content, imageUrl } = action.payload;
			const existingNote = state.notes.find((note) => note.id === id);
			if (existingNote) {
				existingNote.title = title;
				existingNote.content = content;
				existingNote.imageUrl = imageUrl;
			}
		},
		togglePinNote: (state, action: PayloadAction<string>) => {
			const note = state.notes.find((note) => note.id === action.payload);
			if (note) note.pinned = !note.pinned;
		},
	},
});

export const { addNote, deleteNote, editNote, togglePinNote } = notesSlice.actions;
export default notesSlice.reducer;
