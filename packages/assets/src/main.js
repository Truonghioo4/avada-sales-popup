import React from 'react';
import ReactDOM from 'react-dom/client';
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Button, Card} from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';

const loading = document.getElementById('PreLoading');
if (loading !== null) {
  loading.style.display = 'none';
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <Page title="Example app">
        <Card sectioned>
          <Button onClick={() => alert('Button clicked!')}>Example button 657</Button>
        </Card>
      </Page>
    </AppProvider>
  </React.StrictMode>
);
