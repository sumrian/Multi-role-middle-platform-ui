<template>
  <PageWrapper title="关于">
    <template #headerContent>
      <div class="flex justify-between items-center">
        <span class="flex-1">
          <a href="http://111.231.7.75:8001" target="_blank">多角色中后台系统:</a>
          一个根据ruoyi-plus-vben修改的中后台系统，基于Vue3.0、Vite、 Ant-Design-Vue 、TypeScript
          的后台解决方案，目标是为中大型项目开发,提供现成的开箱解决方案及丰富的示例,原则上不会限制任何代码用于商用。
        </span>
      </div>
    </template>
    <Description @register="infoRegister" class="enter-y" />
    <Description @register="register" class="my-4 enter-y" />
    <Description @register="registerDev" class="enter-y" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { Description, DescItem, useDescription } from '@/components/Description/index';
  import { GITHUB_URL, SITE_URL, DOC_URL } from '@/settings/siteSetting';

  const { pkg, lastBuildTime } = __APP_INFO__;

  const { dependencies, devDependencies, name, version } = pkg;

  const schema: DescItem[] = [];
  const devSchema: DescItem[] = [];

  const commonTagRender = (color: string) => (curVal) => h(Tag, { color }, () => curVal);
  const commonLinkRender = (text: string) => () =>
    h('a', { href: 'http://111.231.7.75:8001', target: '_blank' }, text);

  const infoSchema: DescItem[] = [
    {
      label: '版本',
      field: 'version',
      render: commonTagRender('processing'),
    },
    {
      label: '最后编译时间',
      field: 'lastBuildTime',
      render: commonTagRender('processing'),
    },
    {
      label: '文档地址',
      field: 'doc',
      render: commonLinkRender('文档地址'),
    },
    {
      label: '预览地址',
      field: 'preview',
      render: commonLinkRender('预览地址'),
    },
    {
      label: 'Github',
      field: 'github',
      render: commonLinkRender('Github'),
    },
  ];

  const infoData = {
    version,
    lastBuildTime,
    doc: DOC_URL,
    preview: SITE_URL,
    github: GITHUB_URL,
  };

  Object.keys(dependencies).forEach((key) => {
    schema.push({ field: key, label: key });
  });

  Object.keys(devDependencies).forEach((key) => {
    devSchema.push({ field: key, label: key });
  });

  const [register] = useDescription({
    title: '生产环境依赖',
    data: dependencies,
    schema: schema,
    column: { xs: 1, sm: 1, md: 2, lg: 3 },
  });

  const [registerDev] = useDescription({
    title: '开发环境依赖',
    data: devDependencies,
    schema: devSchema,
    column: { xs: 1, sm: 1, md: 2, lg: 3 },
  });

  const [infoRegister] = useDescription({
    title: '项目信息',
    data: infoData,
    schema: infoSchema,
    column: { xs: 1, sm: 1, md: 1, lg: 2 },
  });
</script>
