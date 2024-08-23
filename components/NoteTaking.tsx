import { useState, useEffect } from 'react';

const NoteTaking: React.FC = () => {
  const [note, setNote] = useState<string>('');
  const [showNotes, setShowNotes] = useState<boolean>(false); // Set to false to hide notes by default

  useEffect(() => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const saveNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = event.target.value;
    setNote(newNote);
    localStorage.setItem('note', newNote);
  };

  const downloadNote = () => {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleNotesVisibility = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div>
      <button
        onClick={toggleNotesVisibility}
        className="fixed top-2 left-2 py-2 px-4 border border-[#232328] bg-[#18181D] text-[#adadad] font-iosevka text-[16px] z-50"
      >
        {showNotes ? 'Hide notes' : 'Show notes'}
      </button>
      {showNotes && (
        <div className="bg-[#18181D] border border-[#232328] p-4 z-40 fixed top-1/2 left-2 transform -translate-y-1/2 w-full max-w-lg h-auto min-h-[50rem] flex flex-col">
          <textarea
            value={note}
            onChange={saveNote}
            className="w-full flex-grow px-2 border focus:outline-none bg-[#18181D] bg-opacity-10 backdrop-filter backdrop-blur-lg text-[#adadad] resize-none overflow-auto font-NanumGothic"
          />
          <button
            onClick={downloadNote}
            className="mt-2 py-2 border bg-[#18181D] hover:text-[#0972D6] text-[#adadad] font-iosevka text-[16px]"
          >
            Download notes
          </button>
        </div>
      )}
    </div>
  );
};

export default NoteTaking;
