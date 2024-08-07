export const usePlanningCalculator = () => {
  const spentOnDebitMonth = (month) => {
    return month.items.reduce((acc, item) => {
      if (item.operation === "out" && item.paymentMethod === "debit")
        acc += item.value;
      return acc;
    }, 0);
  };
  const spentOnCreditMonth = (month) => {
    return month.items.reduce((acc, item) => {
      if (item.operation === "out" && item.paymentMethod === "credit")
        acc += item.value;
      return acc;
    }, 0);
  };
  const inExpent = (month, items = []) => {
    const itemsToReduce = items.length ? items : month.items;
    return itemsToReduce?.reduce((acc, item) => {
      if (item.operation === "in") acc += item.value;
      return acc;
    }, 0);
  };
  const outExpent = (month, items = []) => {
    const itemsToReduce = (items.length ? items : month.items) ?? [];
    return itemsToReduce.reduce((acc, item) => {
      if (item.operation === "out" && item.paymentMethod !== "credit") {
        acc += item.value;
      } else {
        acc += 0;
      }
      return acc;
    }, 0);
  };

  const investiment = (month) => {
    return month.items.reduce((acc, item) => {
      if (item.isInvestiment) acc += item.value;
      return acc;
    }, 0);
  };

  const monthBalance = (month) => {
    return inExpent(month) - outExpent(month);
  };

  return {
    in: inExpent,
    out: outExpent,
    monthBalance,
    spentOnCreditMonth,
    spentOnDebitMonth,
    investiment,
  };
};
