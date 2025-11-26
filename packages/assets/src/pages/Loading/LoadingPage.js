import {Card, Layout, Page, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';

const LoadingPage = () => (
  <Page>
    <Layout>
      <Layout.Section>
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
      </Layout.Section>
    </Layout>
  </Page>
);

export default LoadingPage;
