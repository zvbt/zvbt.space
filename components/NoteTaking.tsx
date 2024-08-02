import { useState, useEffect } from 'react';

const NoteTaking: React.FC = () => {
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      setNote(savedNote);
      console.log('Loaded note from localStorage:', savedNote);
    }
  }, []);

  const SaveNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = event.target.value;
    setNote(newNote);
    localStorage.setItem('note', newNote);
    console.log('Auto save note to localStorage:', note);
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

  return (
    <div className="fixed top-1/2 left-0 transform -translate-y-1/2 w-96 h-[50rem] bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md z-50">
      <h1 className="text-white font-bold mb-2 text-center">노트를</h1>
      <textarea
        value={note}
        onChange={SaveNote}
        className="w-full h-[calc(100%-5rem)] px-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-white resize-none overflow-auto"
      />
      <button
        onClick={downloadNote}
        className="mt-2 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        노트를 다운받음
      </button>
    </div>
  );
};

export default NoteTaking;
