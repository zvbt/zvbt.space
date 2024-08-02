import { useState, useEffect } from 'react';

const NoteTaking: React.FC = () => {
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    const savedNote = localStorage.getItem('note');
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  const SaveNote = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg shadow-md z-50 fixed top-1/2 left-2 transform -translate-y-1/2 w-full max-w-lg h-auto min-h-[50rem] hidden lg:flex flex-col">
      <h1 className="text-white mb-2 text-center font-NanumGothic">노트를</h1>
      <textarea
        value={note}
        onChange={SaveNote}
        className="w-full flex-grow px-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg text-white placeholder-white resize-none overflow-auto font-NanumGothic"
      />
      <button
        onClick={downloadNote}
        className="mt-2 py-2 border bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg hover:bg-white hover:text-black text-white rounded font-NanumGothic"
      >
        노트를 다운받음
      </button>
    </div>
  );
};

export default NoteTaking;
