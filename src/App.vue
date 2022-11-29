<template>
  <div class="max-w-[1440px] mx-auto p-6">
    <RouterView #default="routeParams">
      <Transition name="route" appear>
        <component
          :is="routeParams.Component"
          :key="routeParams.route.name"
        />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active {
  transition: all 0.2s ease-out;
}
.route-leave-active {
  transition: all 0.2s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
