(function () {
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function getQueryParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
  }

  function saveUTMToLocalStorage() {
    const params = getQueryParams();
    let found = false;
    utmParams.forEach(key => {
      if (params[key]) {
        localStorage.setItem(key, params[key]);
        found = true;
      }
    });
    return found;
  }

  function applyUTMFromLocalStorage() {
    const currentParams = getQueryParams();
    const newParams = { ...currentParams };
    let updated = false;

    utmParams.forEach(key => {
      if (!currentParams[key]) {
        const stored = localStorage.getItem(key);
        if (stored) {
          newParams[key] = stored;
          updated = true;
        }
      }
    });

    if (updated) {
      const newSearch = '?' + new URLSearchParams(newParams).toString();
      const newUrl = window.location.pathname + newSearch + window.location.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }

  saveUTMToLocalStorage();
  applyUTMFromLocalStorage();
})();