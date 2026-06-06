export const getAllNotes = async (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
};
