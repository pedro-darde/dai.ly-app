<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <HeaderComponent :headerTitle="'Notas'"></HeaderComponent>
    <main>
      <div class="flex flex-row">
        <div class="basis-1/2">
          <div class="container mx-auto">
            <button class="bg-indigo-500">Save changes</button>
          </div>
        </div>
        <div class="basis-1/4">Listagem notas fixas</div>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>

<style scoped></style>
