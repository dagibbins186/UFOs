// Import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
    // Next, loop through each object in the data and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
      // Loop through each field in the dataRow and add each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }
  // Establish variable; use it to track all filters as an object
var newEntries = d3.select("clear-btn");
newEntries.on("click",function() {
  location.reload();
});
  // Establish variable; use it to track all filters as an object  
var filters = {
};
  // Update the filters
function newFilters() {
    //Save the element, changed to variable
    let newInput = d3.select(this);
    //Save the value, changed to variable
    let newValue = newInput.property("value");
    //Save the ID of filter, changed to variable
    let newID = newInput.attr("id");
    //If a filter used, add that filter ID and value. Othewise, clear that filter.
      if (newValue) {
        filters[newID] = newValue;
    } else{filters={};};
    //Use function to apply filters and rebuild the table
    filterTable(filters);
};
  // Use function to filter table when data is entered
function filterTable(obj) {
    let filteredData = tableData;
    console.log(tableData)
    // Loop through data and keep data that matches the filtered values
    Object.entries(obj).forEach(([fkey, fval]) =>{
      filteredData = filteredData.filter(row => row[fkey] === fval)
  });
    //Rebuild table with filtered data
  buildTable(filteredData);
};
    // Attach an event to listen for the form button
  d3.selectAll("input").on("change",newFilters);
  //Build the table when the page loads
  buildTable(tableData);
