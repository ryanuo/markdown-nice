import { storiesOf } from '@storybook/react'

storiesOf('线上版', module).add('线上版', () => <Online />)

storiesOf('图床参数', module)
  .add('默认图床', () => <DefaultImageHosting />)
  .add('全部图床', () => <AllImageHosting />)
  .add('无图床', () => <NoneImageHosting />)
