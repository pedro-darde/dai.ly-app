export const organizeSpents = (spents) => {
  spents.forEach((parent) => {
    parent.toggledItems = false;
    if (parent.children) {
      parent.children = organizeSpents(parent.children);
    }
  });
  return spents;
};
