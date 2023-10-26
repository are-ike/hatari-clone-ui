export const nodeTypes = {
  action: "action",
  input: "input",
  rule: "rule",
};

export const conditions = {
  AND: "AND",
  OR: "OR",
};

export const ruleRow = {
  field: "",
  operator: "",
  value: "",
  condition: null,
};

export const projectStatuses = {
  [true]: "connected",
  [false]: "disconnected",
};

export const ruleFields = [
  {
    label: "user",
    value: "user",
  },
  {
    label: "gateway",
    value: "gateway",
  },
  {
    label: "amount",
    value: "amount",
  },
  {
    label: "transaction_type",
    value: "transaction_type",
  },
  {
    label: "country",
    value: "country",
  },
  {
    label: "currency",
    value: "currency",
  },
  {
    label: "card_type",
    value: "card_type",
  },
  {
    label: "last_4_digits",
    value: "last_4_digits",
  },
];

export const ruleOperators = [
  {
    label: "==",
    value: "equals_to",
  },
  {
    label: "!=",
    value: "not_equals_to",
  },
  {
    label: ">=",
    value: "greater_than",
  },
  {
    label: ">",
    value: "greater",
  },
  {
    label: "<",
    value: "lesser",
  },
  {
    label: "<=",
    value: "lesser_than",
  },
];
