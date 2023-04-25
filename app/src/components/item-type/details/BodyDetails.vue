<template>
  <div class="bg-white border-b flex flex-col w-full">
    <div
      v-for="parent in details"
      v-if="getSpentsValue(parent) != 0"
      class="flex flex-col w-96 ml-2 bg-white p-2 rounded border-l-4 mb-2"
    >
      <div class="flex flex-row justify-between items-center">
        <span class="px-3 py-3">
          {{ parent.description }}
        </span>
        <span
          :class="[
            'px-3 py-3',
            getSpentsValue(parent) < 0 ? 'text-red-500' : 'text-emerald-500',
          ]"
        >
          {{ getSpentsValue(parent) | toMonetary }}
        </span>
        <span>
          <a
            href="#"
            @click="parent.toggledItems = !parent.toggledItems"
            class="font-bold text-xs"
            v-if="parent.spents && parent.spents.length"
          >
            See items
          </a>
        </span>
      </div>
      <div v-if="parent.toggledItems">
        <div
          v-for="parentSpent in parent.spents"
          class="text-xs bg-gray-400 text-white font-bold ml-5 flex flex-col justify-between items-start gap-5"
        >
          <div class="flex flex-row">
            <span
              class="px-3 py-3 w-24 text-ellipsis overflow-hidden"
              :title="parentSpent.description"
              >{{ parentSpent.description }}</span
            >
            <span class="px-3 py-3 w-14">{{
              parentSpent.value | toMonetary
            }}</span>
            <span class="px-3 py-3 w-8">
              {{ parentSpent.operation }}
            </span>
            <span class="px-3 py-3 w-8">
              {{ parentSpent.payment_method }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="parent.children">
        <BodyDetails
          :items="items"
          :details="parent.children"
          :isOnChildren="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BodyDetails",
  props: {
    details: {
      required: true,
    },
    items: {
      type: Array,
    },
    isOnChildren: {
      default: false,
    },
  },
  methods: {
    shouldShowItems(detail) {
      return detail.toggledItems;
    },
    shouldShowDetail(detail) {
      return detail?.spents.length > 0;
    },
    getSpentsValue(detail) {
      let totalWithChilds = detail?.spents.reduce(
        (acc, { value, operation }) => {
          if (operation == "in") {
            acc += value;
          } else {
            acc -= value;
          }
          return acc;
        },
        0
      );
      if (detail.children) {
        for (const child of detail.children) {
          totalWithChilds += this.getSpentsValue(child);
        }
      }
      return totalWithChilds;
    },
    getItemsForSpent(spent) {
      return this.items.filter((item) => item.idType == spent.type);
    },
  },
};
</script>
