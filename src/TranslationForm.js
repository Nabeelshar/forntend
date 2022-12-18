import React, { useState } from 'react';
import axios from 'axios';

function TranslationForm() {
  const [text, setText] = useState('');
  const [to, setTo] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.get(`https://shiny-ants-type-139-5-117-234.loca.lt/translate`, {
        params: {
          text,
          to,
        },
        headers: {
          'x-api-key': apiKey,
          'Bypass-Tunnel-Reminder': 'true'
        },
      });
      setTranslatedText(response.data.text);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleKeyChange(event) {
    setApiKey(event.target.value);
  }

  return (
    <div className="flex justify-between items-center bg-gray-800 py-4 px-8"
      style={{
        background: '',
      }}
    >
      <h1 className="text-2xl font-bold text-black">Novel App</h1>
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        {error && <p className="text-red-600">{error}</p>}
        <div className="form-group">
          <label className="font-bold text-2xl text-black">Text:</label>
          <textarea
            defaultValue={text}
            onInput={event => setText(event.target.value)}
            className="form-control h-32 text-black"
            style={{
              background: '',
            }}
          />
        </div>

        <div className="form-group">
          <label className="font-bold">To:</label>
          <select
            value={to}
            onChange={event => setTo(event.target.value)}
            className="form-control"
            required
          >
            <option value="">Select a language</option>
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Korean">Korean</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div className="form-group">
          <label className="font-bold text-black">API key:</label>
          <input
            value={apiKey}
            onChange={handleKeyChange}
            className="form-control"
            required
          />
        </div>

    <div className="mt-4 text-center">
      <button type="submit" className="btn btn-primary">Translate</button>
      
    </div>
    <div className="form-group mt-4">
        <label className="font-bold text-black">Translated text:</label>
        <input value={translatedText} className="form-control text-black" readOnly />
      </div>
  </form>
</div>
);


}

export default TranslationForm;
