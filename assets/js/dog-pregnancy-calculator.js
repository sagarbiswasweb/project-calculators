const matingInput = document.getElementById('matingDate');
const dueInput = document.getElementById('dueDate');
const output = document.getElementById('output');

matingInput.addEventListener('input', function () {
  if (matingInput.value) {
    const matingDate = new Date(matingInput.value);
    const dueDate = new Date(matingDate);
    dueDate.setDate(dueDate.getDate() + 63);
    dueInput.value = dueDate.toISOString().split('T')[0];
    displayOutput(matingDate, dueDate);
  }
});

dueInput.addEventListener('input', function () {
  if (dueInput.value) {
    const dueDate = new Date(dueInput.value);
    const matingDate = new Date(dueDate);
    matingDate.setDate(matingDate.getDate() - 63);
    matingInput.value = matingDate.toISOString().split('T')[0];
    displayOutput(matingDate, dueDate);
  }
});

function displayOutput(matingDate, dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
  
    const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    const dayName = dueDate.toLocaleDateString('en-US', { weekday: 'long' });
  
    let message = '';
  
    if (diff > 0) {
      const earlyDate = new Date(dueDate);
      earlyDate.setDate(dueDate.getDate() - 2);
      const lateDate = new Date(dueDate);
      lateDate.setDate(dueDate.getDate() + 2);
  
      message = `
        <div class="mb-2 text-success">🐶 Your dog is going to give birth in <strong>${diff} days</strong>!</div>
        <div class="mb-2">🗓️ Delivery may happen between <strong>${earlyDate.toLocaleDateString()}</strong> to <strong>${lateDate.toLocaleDateString()}</strong>.</div>
        <div>📅 Expected due date is <strong>${dayName}</strong> (${dueDate.toLocaleDateString()})</div>
      `;
    } else if (diff === 0) {
      message = `<div class="mb-2 text-warning">🎉 Today is the due date! Your dog may give birth anytime!</div>`;
    } else {
      message = `<div class="mb-2 text-danger">⚠️ The due date was <strong>${Math.abs(diff)} days ago</strong>!</div>`;
    }
  
    output.innerHTML = message;
  }
  

function clearFields() {
  matingInput.value = '';
  dueInput.value = '';
  output.innerHTML = '';
}

function shareResult() {
  const text = output.textContent.trim();
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Result copied to clipboard!");
    });
  } else {
    alert("No result to share yet!");
  }
}
