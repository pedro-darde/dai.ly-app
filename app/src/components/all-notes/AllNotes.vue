<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'All Notes'" about="All notes list"></Header>
    <main>
      <div class="flex justify-center align-center flex-wrap mt-2">
        <Card v-for="note in notes" :key="note.id" classes="bg-yellow-200 mb-2 w-72">
          <template v-slot:title>
            <h3 class="text-gray-900 text-2xl leading-tight font-medium mb-2 break-words">
              {{ note.description }}
            </h3>
          </template>
          <template v-slot:content>
             
          </template>
          <template v-slot:extra-info>
            <span class="text-sm italic">
                <strong> Created at: </strong> {{ note.created_at |  toDateBR }} 
              </span>
              <div>
              <a
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-600"
                v-if="note.tasks?.length"
                @click="toggleInfoTasks(note)"
                title="View tasks"
              >
                Tasks
              </a>
            </div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>
