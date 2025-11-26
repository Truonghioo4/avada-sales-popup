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
            <Button
              size="large"
              tone="success"
              variant="primary"
              loading={editing}
              onClick={handleSaveInput}
            >
              Save
            </Button>
          </InlineStack>
        </Layout.Section>
        <Layout.Section>
          <InlineGrid columns={{md: 1, lg: ['oneThird', 'twoThirds']}}>
            <NotificationPopup
              firstName="Wellington"
              city="South Kendrick"
              country="Vietnam"
              productName="Recycled Metal Keyboard with Backlight"
              timestamp={formatToTimeAgo('2025-11-04T15:18:15.193Z')}
              productImage="https://picsum.photos/seed/iKclrFweJ/2980/639"
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
