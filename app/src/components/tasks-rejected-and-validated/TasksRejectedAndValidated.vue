<template>
  <div class="main">
    <NavbarComponent></NavbarComponent>
    <Header :headerTitle="'Rejected and Validated Tasks'"></Header>

    <main>
      <div class="flex justify-center align-center flex-wrap mt-2">
        <div v-for="task in tasks"
             :class="['ml-1.5 flex flex-col p-6 rounded-lg shadow-lg max-w-sm', getBgColor(task)] ">
          <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{ task.title }}</h5>
          <p class="text-gray-700 text-base mb-4">
            {{ task.about }}
          </p>
          <div class="time-info mt-auto">
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
              <a class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-600" v-if="task.notes?.length"
                 @click="showNotesInfo(getNotesTask(task.notes))" title="Visualizar notas">
                  Notas
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

</template>

<script src="./script.js">

</script>

<style scoped>

</style>