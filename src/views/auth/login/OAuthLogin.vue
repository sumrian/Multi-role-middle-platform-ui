<template>
  <Row class="flex justify-evenly enter-x">
    <!-- todo 这里在点击登录时要disabled -->
    <Col :span="4" v-for="item in clientList" :key="item.key">
      <Tooltip :title="item.title + '登录'">
        <div class="w-full flex justify-center items-center">
          <Icon
            class="avatar cursor-pointer"
            :class="itemClass"
            :icon="item.avatar"
            :color="item.color"
            @click="item.action"
          />
        </div>
      </Tooltip>
    </Col>
  </Row>
</template>

<script lang="ts">
  import { accountBindList } from '@/views/auth/common';
  import { Tooltip, Row, Col } from 'ant-design-vue';
  import { computed, defineComponent } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';

  export default defineComponent({
    name: 'OAuthLogin',
    components: {
      Tooltip,
      Icon,
      Row,
      // eslint-disable-next-line vue/no-reserved-component-names
      Col,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const clientList = accountBindList.filter((item) => item.action);

      /** 登录中应该disabled第三方登录 */
      const itemClass = computed(() => {
        if (props.disabled) {
          return 'pointer-events-none';
        }
        return '';
      });

      return {
        itemClass,
        clientList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .avatar {
    font-size: 25px !important;
  }
</style>
