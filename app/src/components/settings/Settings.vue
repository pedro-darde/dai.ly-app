<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'Settings'" about="System configs"></Header>
    <div class="flex justify-center">
      <div class="flex flex-col items-center mt-2 max-h-96 overflow-auto w-1/2">
        <div class="flex gap-2 items-end mt-2" v-for="setting in settings">
          <Input label="Key" v-model="setting.key" disabled />

          <Input label="Value" v-model="setting.value" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>
