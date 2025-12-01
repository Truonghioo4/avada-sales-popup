import {BlockStack, Card, Layout, Page, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';

const LoadingPage = () => (
  <Page>
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <Card>
            <Card>
              <SkeletonBodyText lines={5} />
            </Card>
          </Card>
          <Card>
            <Card>
              <SkeletonBodyText lines={5} />
            </Card>
          </Card>
        </BlockStack>
      </Layout.Section>
    </Layout>
  </Page>
);

export default LoadingPage;
