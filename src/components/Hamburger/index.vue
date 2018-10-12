<template>
  <div>
    <!-- <svg t="1492500959545" @click="toggleclick" class="wscn-icon hamburger" :class="{'is-active':isActive}" style=""
      viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64" height="64">
      <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
        p-id="1692"></path>
      <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
        p-id="1693"></path>
      <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
        p-id="1694"></path>
    </svg> -->
    <b><a class="iconfont icon-yingyongguanli hamburger" @click="toggleclick" style="font-size: 20px;"></a></b>
  </div>
</template>

<script>
  export default {
    name: 'hamburger',
    props: {
      isActive: {
        type: Boolean,
        default: true
      },
      toggleclick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style scoped>
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      /* IE 9 */
      -moz-transform: rotate(0deg);
      /* Firefox */
      -o-transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      /* IE 9 */
      -moz-transform: rotate(360deg);
      /* Firefox */
      -o-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate {
    0% {
      -moz-transform: rotate(0deg);
    }

    100% {
      -moz-transform: rotate(360deg);
    }
  }

  .hamburger {
    display: inline-block;
    cursor: pointer;
  }

  .hamburger:hover {
    display: inline-block;
    cursor: pointer;
    animation: rotate 1s infinite;
    border: 0px
      /*Safari and Chrome*/
  }
</style>
