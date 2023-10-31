import { useHistory, useLocation } from "react-router-dom";

const useSetParams = (key) => {
  const location = useLocation();
  const history = useHistory();
  const keyString = `?${key}=`;
  let offset;
  let paramIdx = -1;

  const keyValuePairs = location.search
    ? location.search.split("&")
    : [keyString];

  for (let i = 0; i < keyValuePairs.length; i++) {
    const x = keyValuePairs[i];

    if (x.startsWith(keyString)) {
      offset = 2;
      paramIdx = i;
      break;
    } else if (x.startsWith(keyString.slice(1))) {
      offset = 1;
      paramIdx = i;
      break;
    } else {
      continue;
    }
  }

  if (paramIdx === -1) {
    keyValuePairs.push(keyString.slice(1));
    paramIdx = keyValuePairs.length - 1;
    offset = 1;
  }

  const params = keyValuePairs[paramIdx];

  const value = params.slice(key.length + offset);

  const setParams = (newValue) => {
    let newParams;
    if (!value) {
      newParams = params + newValue;
    } else {
      newParams = params.replace(value, newValue);
    }

    keyValuePairs[paramIdx] = newParams;
    history.push(location.pathname + keyValuePairs.join("&") + location.hash);
  };

  return [value, setParams];
};

export default useSetParams;
