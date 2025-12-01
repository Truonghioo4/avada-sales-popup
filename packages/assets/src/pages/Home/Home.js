import React, {useState} from 'react';
import {BlockStack, Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const activeAppUrl = `https://${shopify.config.shop}/admin/themes/current/editor?context=apps&activateAppId=${shopify.config.apiKey}/avada-sales-pop`;
  return (
    <Page title="Dashboard">
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <InlineStack blockAlign="center">
                <Text as="span">
                  Please enable the app by clicking the button below and then <strong>Save</strong>{' '}
                  your theme. Our features will not be shown until you enable.
                </Text>
                <div style={{flex: 1}} />
                <Button
                  variant={enabled ? 'secondary' : 'primary'}
                  onClick={() => {
                    window.open(activeAppUrl, '_blank');
                  }}
                >
                  {enabled ? 'Disable' : 'Enable'}
                </Button>
              </InlineStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
