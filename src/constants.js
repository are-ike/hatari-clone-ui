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

export const isWorkflowDirty = (oldWorkflow, newWorkflow, checkData = false) => {
  if (oldWorkflow.nodes.length !== newWorkflow.nodes.length) return true;
  if (oldWorkflow.edges.length !== newWorkflow.edges.length) return true;
  // console.log(1);

  for (let i = 0; i < oldWorkflow.nodes.length; i++) {
    const node = oldWorkflow.nodes[i];

    const newNode = newWorkflow.nodes.filter(n => n.id === node.id)[0]
    // console.log(2, node, newNode);
    if (newNode.position.x !== node.position.x) return true;
    // console.log(3, node);
    if (newNode.position.y !== node.position.y) return true;
    // console.log(4, node);
    
    if(!checkData) continue

    if(node.data.label !== newNode.data.label) return true
    if(JSON.stringify(node.data.rules) !== JSON.stringify(newNode.data.rules) && node.id === nodeTypes.rule) return true
    if(node.data.action !== newNode.data.action && node.id === nodeTypes.action) return true
    if(node.data.isCustom !== newNode.data.isCustom && node.id === nodeTypes.action) return true

  }
  return false;
};

export const isValidUrl = urlString=> {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}