import React from 'react';

import {
  Card,
  Divider,
  InlineStack,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Text
} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import LoadingPage from '@assets/pages/Loading/LoadingPage';
import useDeleteApi from '@assets/hooks/api/useDeleteApi';
import {formatToDate, formatToTimeAgo} from '@assets/helpers/utils/formatTimestamp';
import usePaginate from '@assets/hooks/api/usePaginate';
import useConfirmModal from '@assets/hooks/popup/useConfirmModal';

/**
 * Notifications page component
 * @returns {React.JSX.Element}
 * @constructor
 */
export default function Notifications() {
  const PAGE_LIMIT = 5;
  const {loading, data, setData, pageInfo, prevPage, nextPage, page} = usePaginate({
    url: '/notifications',
    defaultLimit: PAGE_LIMIT,
    defaultSort: 'timestamp_desc',
    initQueries: {hasCount: true}
  });
  const {deleting, handleDelete} = useDeleteApi({url: '/notifications'});
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [sortValue, setSortValue] = React.useState('DATE_MODIFIED_DESC');

  const handleSortChange = sortItems => {
    return sortItems.sort((a, b) => {
      if (sortValue === 'DATE_MODIFIED_DESC') {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }

      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  };

  const handleDeleteBulk = async () => {
    const deletePromises = selectedItems.map(id => handleDelete({id}));
    await Promise.all(deletePromises);
    closeModal();
    setData(prevData => prevData.filter(noti => !selectedItems.includes(noti.id)));
    setSelectedItems([]);
  };

  const {modal, closeModal, openModal} = useConfirmModal({
    title: 'Remove selected notification(s)?',
    content: 'This action cannot be undone.',
    buttonTitle: 'Delete',
    loading: deleting,
    confirmAction: handleDeleteBulk
  });

  if (loading) return <LoadingPage />;
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Text as="h1" variant="headingLg">
            Notifications
          </Text>
          <Divider borderColor="transparent" borderWidth="100" />
          <Text as="span" tone="subdued">
            List of sales notification from Shopify.
          </Text>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <ResourceList
              items={data || []}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              selectable
              sortValue={sortValue}
              sortOptions={[
                {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
                {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                setData(handleSortChange(data));
              }}
              promotedBulkActions={[
                {
                  content: 'Delete',
                  onAction: () => openModal()
                }
              ]}
              renderItem={noti => {
                const {id, firstName, city, country, productName, timestamp, productImage} = noti;
                return (
                  <ResourceItem id={id} key={id}>
                    <InlineStack align="space-between" blockAlign="center">
                      <NotificationPopup
                        firstName={firstName}
                        city={city}
                        country={country}
                        productName={productName}
                        timestamp={formatToTimeAgo(timestamp)}
                        productImage={productImage}
                      />
                      <Text as="p">From {formatToDate(timestamp)}</Text>
                    </InlineStack>
                  </ResourceItem>
                );
              }}
              pagination={{
                label: `${page}/${pageInfo.totalPage}`,
                hasNext: pageInfo.hasNext,
                onNext: async () => await nextPage(),
                hasPrevious: pageInfo.hasPre,
                onPrevious: async () => await prevPage()
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>{modal}</Layout.Section>
      </Layout>
    </Page>
  );
}
