
<template>
    <div class="container mt-2 p-2">
        <table class="w-full text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th scope="col" class="px-3 py-3"> Description </th>
                    <th colspan="2" scope="col" class="px-3 py-3"> Value </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="detail in details" class="bg-white border-b">
                    <td class="px-3 py-3"> {{  detail.description }}</td>
                    <td class="px-3 py-3"> {{  detail.value | toMonetary }}</td>
                    <td class="px-3 py-3 text-center">
                        <p v-if="detail.operation == 'in'" class="text-green-600 font-bold text-xl">
                            +
                        </p>
                        <p v-else class="text-red-700 font-bold text-xl"> 
                            -
                        </p>
                    </td>
                </tr>
            </tbody>
            <tfoot class="text-xs text-gray-700 uppercase bg-gray-300 border-b-8 border-gray-400">
                <tr>
                    <td colspan="2" class="font-bold text-right px-6 py-3 text-base" > Total In </td>
                    <td class='text-center text-green-500 font-bold'> +  {{ totalIn | toMonetary }} </td>
                </tr>
                <tr>
                    <td colspan="2" class="font-bold text-right px-6 py-3 text-base" > Total Out</td>
                    <td class="text-center text-red-500 font-bold"> - {{ totalOut | toMonetary }} </td>
                </tr>
                <tr class="text-center">
                    <td colspan="2" class="font-bold text-right px-6 py-3 text-base" > </td>
                    <td > {{ balance | toMonetary }} </td>
                </tr>
            </tfoot>
        </table>
    </div>  
</template>

<script src="./script.js"></script>