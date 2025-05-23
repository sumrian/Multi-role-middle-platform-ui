<template>
  <div :class="prefixCls">
    <Popover title="" trigger="click" :overlayClassName="`${prefixCls}__overlay`">
      <Badge :count="unreadCount" :offset="[0, 15]" size="small" :numberStyle="numberStyle">
        <BellOutlined />
      </Badge>
      <template #content>
        <Tabs centered>
          <template v-for="item in userMessageList" :key="item.key">
            <TabPane>
              <template #tab>
                {{ item.name }}
                <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
              </template>
              <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
              <NoticeList :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
              <NoticeList :list="item.list" v-else />
            </TabPane>
          </template>
        </Tabs>
        <div class="w-full">
          <a-button
            type="success"
            block
            class="btn-clear-all"
            @click="readAllMessage"
            :disabled="unreadCount === 0"
            >已读全部消息</a-button
          >
          <a-button
            type="error"
            block
            class="btn-clear-all"
            @click="clearAllMessage"
            :disabled="count === 0"
            >清空全部消息</a-button
          >
        </div>
      </template>
    </Popover>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Popover, Tabs, Badge } from 'ant-design-vue';
  import { BellOutlined } from '@ant-design/icons-vue';
  import { ListItem } from './data';
  import NoticeList from './NoticeList.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useNotifyStore } from '@/store/modules/notify';
  import { storeToRefs } from 'pinia';

  export default defineComponent({
    components: { Popover, BellOutlined, Tabs, TabPane: Tabs.TabPane, Badge, NoticeList },
    setup() {
      const { prefixCls } = useDesign('header-notify');
      const { createConfirm } = useMessage();

      const notifyStore = useNotifyStore();
      const { count, unreadCount, userMessageList } = storeToRefs(notifyStore);
      notifyStore.listeningMessage();

      const currentModal = ref<ReturnType<typeof createConfirm> | null>(null);
      function onNoticeClick(record: ListItem) {
        if (currentModal.value) {
          currentModal.value.destroy();
        }
        currentModal.value = createConfirm({
          iconType: 'info',
          title: '消息通知',
          content: `${record.title}<br/>
                    ${record.datetime}`,
          okText: '已读',
          okButtonProps: {
            disabled: record.titleDelete,
          },
          onOk() {
            if (!record.titleDelete) {
              record.titleDelete = true;
            }
          },
        });
        console.log(record);
        console.log('你点击了通知, ID=' + record.id);
      }

      function clearAllMessage() {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确定要清空所有消息吗?',
          onOk() {
            notifyStore.clearAll();
          },
        });
      }

      function readAllMessage() {
        createConfirm({
          iconType: 'warning',
          title: '提示',
          content: '确定要已读所有消息吗?',
          onOk() {
            notifyStore.readAll();
          },
        });
      }

      return {
        prefixCls,
        userMessageList,
        count,
        unreadCount,
        onNoticeClick,
        numberStyle: {
          fontSize: '10px',
        },
        clearAllMessage,
        readAllMessage,
      };
    },
  });
</script>
<style lang="less">
  .ant-popover-inner {
    min-width: 210px;
  }

  .btn-clear-all {
    margin: 5px 0 0;
  }
</style>
