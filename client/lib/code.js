
class Code {
  constructor() {
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    const inputs = [];

    const prototype = Object.freeze(
      Object.assign(
        Object.create(null),
        {
          add: createAdd(code, inputs)
        }
      )
    );

    return Object.freeze(Object.create(prototype));
  }
}

const createAdd = (code, inputs) => newInput => {
  let matches = false;
  if (code[inputs.length] === newInput) {
    inputs.push(newInput);
  } else {
    inputs.length = 0;
  }
  if (code.length === inputs.length) {
    matches = true;
    inputs.length = 0;
  }
  return matches ? '🤫' : '😔';
};

export default Code;
