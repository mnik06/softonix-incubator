<template>
  <div class="min-h-screen min-w-screen">
    <RouterView #default="routeParams">
      <transition name="route" mode="out-in">
        <!-- <keep-alive> -->
        <component
          :is="routeParams.Component"
          :key="routeParams.route.name"
        />
        <!-- </keep-alive> -->
      </transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: scale(.9);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.2s ease-out;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
