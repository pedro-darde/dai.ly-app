<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'Rejected and Validated Tasks'"></Header>
    <main>
      <div class="flex justify-center align-center flex-wrap mt-2">
        <Card v-for="task in tasks" :key="task.id" :classes="getBgColor(task)">
          <template v-slot:title>
            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">
              {{ task.title }}
            </h5>
          </template>
          <template v-slot:info> {{ task.about }}</template>
          <template v-slot:extra-info>
            <div v-if="isTaskValidated(task)">
              <span class="text-sm italic">
                <strong> Time spent: </strong> {{ task.timeSpent }} days
              </span>
              <span class="text-sm italic">
                <strong> Expected time: </strong> {{ task.expectedTime }} days
              </span>
            </div>
            <div v-else>
              <span class="text-sm italic">
                <strong> This task was rejected </strong>
              </span>
            </div>
            <div>
              <a
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-600"
                v-if="task.notes?.length"
                @click="showNotesInfo(getNotesTask(task.notes))"
                title="Visualizar notas"
              >
                Notas
              </a>
            </div>
          </template>
        </Card>
      </div>
    </main>
  </div>
</template>

<script src="./script.js"></script>

<style scoped></style>
