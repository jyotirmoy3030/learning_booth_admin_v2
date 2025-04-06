import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'es', label: 'Spanish' },
  // Add more if needed
];

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post('https://libretranslate.com/translate', {
        q: inputText,
        source: 'en',
        target: targetLang,
        format: 'text',
      });

      setTranslatedText(res.data.translatedText);
    } catch (err) {
      console.error('Translation failed:', err);
      setTranslatedText('Error translating text');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600 }}>
      <TextField
        label="Enter text in English"
        multiline
        fullWidth
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
        sx={{ mb: 2, minWidth: 150 }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code} value={lang.code}>
            {lang.label}
          </MenuItem>
        ))}
      </Select>

      <Button variant="contained" onClick={handleTranslate} disabled={loading}>
        {loading ? 'Translating...' : 'Translate'}
      </Button>

      {translatedText && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          Translated Text:
        </Typography>
      )}
      <Typography>{translatedText}</Typography>
    </Box>
  );
};

export default Translator;
