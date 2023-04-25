<template>
  <RawPopup v-if="visible" @disband="disband" width="650px">
    <div class="p-5">
      <div class="flex flex-col">
        <form @submit.preve="save">
          <div class="flex flex-row justify-start mt-5">
            <p class="font-bold text-2xl">Create new Type</p>
          </div>
          <div class="flex flex-col border-8 p-3">
            <div class="flex flex-row gap-5 justify-around items-center w-full">
              <Input
                label="Description"
                type="text"
                v-model="description"
                :required="true"
              />

              <Treeselect
                placeholder="Parent"
                v-model="parent"
                :options="itemTypes"
                label="Parent"
                :append-to-body="true"
              />
              <Input label="Active" type="checkbox" v-model="active" />
            </div>

            <div class="flex flex-row justify-end">
              <button
                type="submit"
                class="p-2 bg-green-500 rounded hover:bg-green-200 mt-2"
              >
                Salvar
              </button>
            </div>
          </div>
        </form>

        <!-- <div class="flex flex-row justify-start mt-5 w-full">
          <p class="font-bold text-2xl">Tree of Types</p>
        </div> -->
        <!-- <div class="flex flex-row justify-center">
          <nested-draggable :items="itemTypes"></nested-draggable>
        </div> -->
      </div>
    </div>
  </RawPopup>
</template>

<script src="./script.js"></script>
