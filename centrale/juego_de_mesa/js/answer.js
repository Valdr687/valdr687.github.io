const number_of_question = 5;
const answers = { 0: "Estamos listos","1":"placeholder","2":"placeholder","3":"placeholder","4":"placeholder","5":"placeholder"};

function match(string, expected) {
    // Normalize function to handle case, accents, and special characters
    const normalize = (str) => {
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9\s]/g, '') // Remove special characters
            .trim()
            .replace(/\s+/g, ' '); // Normalize whitespace
    };
    
    return normalize(string) === normalize(expected);
}

function getInputValue(id) {
  const inputValue = document.getElementById(id).value;
  var id = id[id.length - 1];
console.log(id);
  id = parseInt(id);

  if (match(inputValue, answers[id])) {
    const element = document.getElementById(id + 1);
    element.classList.remove("hidden");
  }
}
