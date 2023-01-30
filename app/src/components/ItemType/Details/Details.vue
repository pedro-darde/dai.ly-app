
<template>
    <div class="flex flex-row items-center mt-2">
        <div class="bg-white p-2 rounded border-l-8"  >
            <h3 class="text-md font-bold text-center"> In </h3>
            <p
                v-for="detail in inDetails"
                class="text-sm font-bold text-green-300 text-center"
            >
                <b> {{ detail.description }} : </b>
                {{ detail.value | toMonetary }}
            </p>
        </div>
        <div class="bg-white p-2 rounded border-l-8">
            <h3 class="text-md font-bold text-center"> Out </h3>
            <span
                v-for="detail in outDetails"
            >
             <b> {{ detail.description }} : </b>
              <p  class="text-sm font-bold text-green-300 text-center"> {{ detail.value | toMonetary }}</p> 
            </span>
        </div>
    </div>
</template>

<script src="./script.js"></script>