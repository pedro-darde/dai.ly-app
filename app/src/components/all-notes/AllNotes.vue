<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'Rejected and Validated Tasks'"></Header>
    <main>
      <div class="flex justify-center align-center flex-wrap mt-2">
        <Card v-for="note in notes" :key="note.id" classes="bg-yellow-200 mb-2 w-72">
          <template v-slot:title>
            <h3 class="text-gray-900 text-2xl leading-tight font-medium mb-2 break-words">
              {{ note.description }}
            </h3>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>
