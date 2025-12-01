import React, {useEffect} from 'react';

import {
  Box,
  Button,
  Card,
  Divider,
  InlineGrid,
  InlineStack,
  Layout,
  Page,
  Tabs,
  Text
} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import Display from '@assets/components/Display/Display';
import defaultSetting from '@assets/const/settings/defaultSetting';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import Triggers from '@assets/components/Triggers/Triggers';
import LoadingPage from '@assets/pages/Loading/LoadingPage';
import useEditApi from '@assets/hooks/api/useEditApi';
import {formatToTimeAgo} from '@assets/helpers/utils/formatTimestamp';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {loading, data: input, setData: setInput, setLoading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSetting
  });
  const {editing, handleEdit} = useEditApi({url: '/settings'});
  const [selectedTab, setSelectedTab] = React.useState(0);

  useEffect(() => {
    !loading &&
      (function() {
        const timestamp = document.querySelector('.Avada-SP__Timestamp');
        const title = document.querySelector('.Avada-SP__Subtitle');
        input.hideTimeAgo
          ? (timestamp.style.visibility = 'hidden')
          : (timestamp.style.visibility = 'visible');
        input.truncateProductName
          ? title.classList.add('Avava-SP__truncate-text')
          : title.classList.remove('Avava-SP__truncate-text');
      })();
  }, [input.truncateProductName, input.hideTimeAgo]);

  const handleChangeInput = key => value => {
    setInput(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const tabs = [
    {
      id: 'settings-displays',
      content: 'Display',
      panelID: 'settings-displays-content-1',
      body: (
        <Display
          loading={loading}
          input={input}
          setInput={setInput}
          setLoading={setLoading}
          handleChangeInput={handleChangeInput}
        />
      )
    },
    {
      id: 'settings-triggers',
      content: 'Triggers',
      panelID: 'settings-triggers-content-1',
      body: (
        <Triggers
          loading={loading}
          input={input}
          setInput={setInput}
          setLoading={setLoading}
          handleChangeInput={handleChangeInput}
        />
      )
    }
  ];

  const handleChangeTab = React.useCallback(
    selectedTabIndex => setSelectedTab(selectedTabIndex),
    []
  );

  const handleSaveInput = async () => {
    await handleEdit(input);
  };
  if (loading) return <LoadingPage />;
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <InlineStack align="space-between" blockAlign="center">
            <Box>
              <Text as="h1" variant="headingLg">
                Settings
              </Text>
              <Divider borderColor="transparent" borderWidth="100" />
              <Text as="span" tone="subdued">
                List of sales notification from Shopify.
              </Text>
            </Box>
            <Button size="large" variant="primary" loading={editing} onClick={handleSaveInput}>
              Save
            </Button>
          </InlineStack>
        </Layout.Section>
        <Layout.Section>
          <InlineGrid
            columns={{md: 1, lg: ['oneThird', 'twoThirds']}}
            gap={{xs: '500', sm: '500', md: '0'}}
          >
            <NotificationPopup
              firstName="Alex"
              city="Fresno"
              country="United States"
              productName="The Multi-managed Snowboard"
              timestamp={formatToTimeAgo('2025-11-17T04:18:19Z')}
              productImage="https://cdn.shopify.com/s/files/1/0779/6752/4089/files/Main_9129b69a-0c7b-4f66-b6cf-c4222f18028a.jpg?v=1762163408"
            />
            <Card title="Order details" sectioned>
              <Tabs tabs={tabs} selected={selectedTab} onSelect={handleChangeTab}>
                <Divider />
                {tabs[selectedTab].body}
              </Tabs>
            </Card>
          </InlineGrid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
