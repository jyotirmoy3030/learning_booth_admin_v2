import { useEffect, useRef, useState } from 'react';
import './google.css'; // Your CSS file

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Vietnamese' },
  // { code: 'hi', label: 'Hindi' },
  // { code: 'fr', label: 'French' },
  // { code: 'de', label: 'German' },
  // { code: 'es', label: 'Spanish' }
];

const GoogleTranslate = () => {
  const [selectedLanguage, setSelectedLanguage] = useState({ code: 'en', label: 'Change Language' });
  const languageTextRef = useRef(null); // 🌟 Ref to hold the span element

  useEffect(() => {
    document.documentElement.classList.add('hide-google-translate');

    if (!document.querySelector('#google-translate-script')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.id = 'google-translate-script';
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: languages.map((l) => l.code).join(','),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );

      document.documentElement.classList.remove('hide-google-translate');
    };

    const applyCustomStyles = () => {
      const gadget = document.querySelector('.goog-te-gadget-simple');
      if (gadget) {
        Object.assign(gadget.style, {
          color: '#000',
          backgroundColor: '#f9f9f9',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 'auto',
          height: '40px',
          padding: '0.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          marginRight: '1rem',
          position: 'relative'
        });

        // Hide default "Select Language"
        const textElements = document.querySelectorAll('.goog-te-gadget-simple span');
        if (textElements.length > 0) {
          textElements[0].style.display = 'none';
        }

        // ✅ Create span to show selected language
        const languageText = document.createElement('span');
        languageText.textContent = selectedLanguage.label;
        languageTextRef.current = languageText; // Save ref
        Object.assign(languageText.style, {
          fontSize: '14px',
          color: '#000',
          fontWeight: '500',
          marginRight: '8px'
        });
        gadget.prepend(languageText);

        // Add dropdown arrow
        const arrow = document.createElement('span');
        arrow.innerHTML = '▼';
        Object.assign(arrow.style, {
          fontSize: '12px',
          color: '#555',
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        });
        gadget.appendChild(arrow);

        // Hover effect
        gadget.addEventListener('mouseover', () => {
          gadget.style.backgroundColor = '#e0e0e0';
        });
        gadget.addEventListener('mouseout', () => {
          gadget.style.backgroundColor = '#f9f9f9';
        });

        // Style dropdown
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          Object.assign(select.style, {
            padding: '8px 12px',
            fontSize: '14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            appearance: 'none',
            width: '100%'
          });

          select.addEventListener('mouseover', () => {
            select.style.border = '1px solid #000';
          });
          select.addEventListener('mouseout', () => {
            select.style.border = '1px solid #ccc';
          });

          select.addEventListener('change', () => {
            const selectedOption = select.options[select.selectedIndex].text;
            const selectedCode = select.value;
            const foundLang = languages.find(l => l.code === selectedCode) || {
              code: selectedCode,
              label: selectedOption
            };

            // Set state (will update span in separate useEffect)
            setSelectedLanguage(foundLang);

            const evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", true, true);
            select.dispatchEvent(evt);
          });
        }
      }
    };

    // Observe when widget is loaded
    const observer = new MutationObserver(() => {
      if (document.querySelector('.goog-te-gadget-simple')) {
        applyCustomStyles();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Observe Google Translate label (dynamic updates)
    const observeTranslatedLabel = () => {
      const target = document.querySelector('.VIpgJd-ZVi9od-xl07Ob-lTBxed span');

      if (!target) {
        setTimeout(observeTranslatedLabel, 500);
        return;
      }

      const labelObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          const newLabel = mutation.target.textContent.trim();
          console.log('Updated span text:', newLabel);
          setSelectedLanguage({ code: 'xx', label: newLabel });
        });
      });

      labelObserver.observe(target, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    };

    observeTranslatedLabel();

    return () => observer.disconnect();
  }, []);

  // ✅ Whenever selectedLanguage changes, update the manual span
  useEffect(() => {
    if (languageTextRef.current) {
      languageTextRef.current.textContent = selectedLanguage.label;
    }
  }, [selectedLanguage]);

  return (
    <div id="google_translate_wrapper">
      <div id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslate;
