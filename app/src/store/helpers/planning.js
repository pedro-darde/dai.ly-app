export const organizeSpents = (spents, budgets) => {
  spents.forEach((parent) => {
    parent.toggledItems = false;
    parent.budget = budgets.find((item) => item.type == parent.id);
    if (parent.children) {
      parent.children = organizeSpents(parent.children, budgets);
    }
  });
  return spents;
};
