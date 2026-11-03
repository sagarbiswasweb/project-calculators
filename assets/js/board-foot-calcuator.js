let boardCounter = 0;
  
      // Function to add new boards dynamically
      function addBoard() {
        const boardHTML = `
          <div class="row border border-dark p-3 mt-3 mb-3 board-item" data-id="${boardCounter}">
            <h5 class="text-center">Board #${boardCounter + 1}</h5>
  
            <div class="col-md-4">
              <label>Thickness</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control my-input-area" name="thickness" required>
                <select class="form-select my-input-area" name="thickness-unit">
                  <option value="millimeter">mm</option>
                  <option value="centimeter">cm</option>
                  <option selected value="meter">m</option>
                  <option value="inch">in</option>
                  <option value="feet">ft</option>
                  <option value="yard">yd</option>
                </select>
              </div>
            </div>
  
            <div class="col-md-4">
              <label>Width</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control my-input-area" name="width" required>
                <select class="form-select my-input-area" name="width-unit">
                  <option value="millimeter">mm</option>
                  <option value="centimeter">cm</option>
                  <option selected value="meter">m</option>
                  <option value="inch">in</option>
                  <option value="feet">ft</option>
                  <option value="yard">yd</option>
                </select>
              </div>
            </div>
  
            <div class="col-md-4">
              <label>Length</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control my-input-area" name="length" required>
                <select class="form-select my-input-area" name="length-unit">
                  <option value="millimeter">mm</option>
                  <option value="centimeter">cm</option>
                  <option selected value="meter">m</option>
                  <option value="inch">in</option>
                  <option value="feet">ft</option>
                  <option value="yard">yd</option>
                </select>
              </div>
            </div>
  
            <div class="col-md-6">
              <label>Quantity</label>
              <input type="number" class="form-control my-input-area mb-3" name="quantity" min="1" step="1" required>
            </div>
  
            <div class="col-md-6">
              <label>Price per board ($)</label>
              <div class="input-group mb-3">
                <input type="number" class="form-control my-input-area" name="board-price" min="0" step="any">
                <span class="input-group-text my-input-group">$</span>
              </div>
            </div>
  
            <div class="col-md-6 text-end">
              ${boardCounter > 0 ? `<button type="button" class="btn btn-outline-danger mt-4" onclick="removeBoard(${boardCounter})">Remove</button>` : ''}
            </div>
          </div>
        `;
  
        document.getElementById("board-list").insertAdjacentHTML("beforeend", boardHTML);
        boardCounter++;
      }
  
      // Function to remove a board
      function removeBoard(id) {
        const board = document.querySelector(`.board-item[data-id="${id}"]`);
        if (board) board.remove();
        updateBoardCounter();
      }
  
      // Update the board counter when a board is removed
      function updateBoardCounter() {
        boardCounter = document.querySelectorAll(".board-item").length;
        const boards = document.querySelectorAll(".board-item");
        boards.forEach((board, index) => {
          board.querySelector('h5').textContent = `Board #${index + 1}`;
          board.setAttribute('data-id', index);
        });
      }
  
      // Function to convert measurements to inches
      function convertToInches(value, unit) {
        switch (unit) {
          case 'millimeter': return value / 25.4;
          case 'centimeter': return value / 2.54;
          case 'meter': return value * 39.3701;
          case 'feet': return value * 12;
          case 'yard': return value * 36;
          default: return value; // inch
        }
      }
  
      // Form submission handling
      document.getElementById("board-foot-calculator").addEventListener("submit", function (e) {
        e.preventDefault();
  
        const boards = document.querySelectorAll(".board-item");
        let totalBoardFeet = 0;
        let resultHTML = "";
        let totalBoardPrice = 0;
  
        boards.forEach((board, index) => {
          const thickness = convertToInches(parseFloat(board.querySelector('[name="thickness"]').value), board.querySelector('[name="thickness-unit"]').value);
          const width = convertToInches(parseFloat(board.querySelector('[name="width"]').value), board.querySelector('[name="width-unit"]').value);
          const length = convertToInches(parseFloat(board.querySelector('[name="length"]').value), board.querySelector('[name="length-unit"]').value);
          const quantity = parseInt(board.querySelector('[name="quantity"]').value);
          const boardPrice = parseFloat(board.querySelector('[name="board-price"]').value) || 0;
  
          const boardFeet = (thickness * width * length / 144) * quantity;
          totalBoardFeet += boardFeet;
  
          resultHTML += `<tr><td>Board #${index + 1} feet:</td><td>${boardFeet.toFixed(2)} bd ft</td></tr>`;
  
          if (boardPrice > 0) {
            const boardTotalPrice = boardFeet * boardPrice;
            totalBoardPrice += boardTotalPrice;
            resultHTML += `<tr><td>Price for Board #${index + 1}:</td><td>$${boardTotalPrice.toFixed(2)}</td></tr>`;
          }
        });
  
        resultHTML += `<tr><td><strong>Total board feet:</strong></td><td><strong>${totalBoardFeet.toFixed(2)} bd ft</strong></td></tr>`;
  
        if (totalBoardPrice > 0) {
          resultHTML += `<tr><td><strong>Total price:</strong></td><td><strong>$${totalBoardPrice.toFixed(2)}</strong></td></tr>`;
        }
  
        document.getElementById("result").innerHTML = resultHTML;
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();
      });
  
      // Clear form inputs and reset the board list
      function clearInputs() {
        document.getElementById("board-foot-calculator").reset();
        document.getElementById("board-list").innerHTML = "";
        boardCounter = 0;
        addBoard();
        document.getElementById("result").innerHTML = "";
        document.querySelector(".my-result-area").style.display = 'none';
      }
  
      // Function to handle smooth scrolling to the submit button
    function smoothScrollToSubmit() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            setTimeout(() => {
                document.getElementById("submit").scrollIntoView({ behavior: 'smooth' });
            }, 300);
        } else {
            document.getElementById("submit").scrollIntoView({ behavior: 'smooth' });
        }
    }
  
      // Add the first board by default
      window.addEventListener('DOMContentLoaded', addBoard);