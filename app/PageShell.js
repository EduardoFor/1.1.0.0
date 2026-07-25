'use client';

import { useEffect, useMemo } from 'react';

export default function PageShell({ bodyContent }) {
  const html = useMemo(() => ({ __html: bodyContent }), [bodyContent]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(bodyContent, 'text/html');
    const scripts = doc.querySelectorAll('script');
    const currentScripts = Array.from(document.querySelectorAll('script[data-next-script]'));
    currentScripts.forEach((script) => script.remove());

    scripts.forEach((script, index) => {
      const newScript = document.createElement('script');
      newScript.dataset.nextScript = 'true';
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.body.appendChild(newScript);
    });
  }, [bodyContent]);

  return <div className="page-shell" dangerouslySetInnerHTML={html} />;
}
