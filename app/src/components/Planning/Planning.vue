<template>
    <div class="bg-gray-100 container w-full p-5 rounded border-l-8 flex flex-col items-start">
        <div class="flex flex-row items-center mb-2">
            <a class="text-green-700 mr-1">
                <money />
            </a>
            <h3 class="text-xl font-bold"> Criar planejamento de {{ year }} </h3>
        </div>
        <form class="m-2">
            <div class="grid md:grid-cols-4 md:gap-3 mb-2">
                <Input label="Planning Title" type="text" v-model="planning.title" />
                <MoneyInput label="Expected Amount" v-model="planning.expectedAmount" />
                <Input label="Start At" type="date" v-model="planning.planningStart" />
                <Input label="End At" type="date" v-model="planning.planningEnd" />
            </div>
            <div class="flex flex-row items-center mr-2">
                <a class="text-green-700 mr-1">
                    <money />
                </a>
                <h3 class="text-lg font-bold"> Meses </h3>
            </div>
        </form>
    </div>
</template>

<script src="./script.js">
</script>