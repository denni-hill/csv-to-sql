document.getElementById("convert_button").addEventListener("click", function(){
    let separator = document.getElementById("coma_separator").checked ? "," : ";";
    let input = document.getElementById("input").value.split("\n");
    let output = csv_to_sql(input, separator);
    document.getElementById("output").innerHTML = output;
  });
  function csv_to_sql(input, separator)
  {
      let output = [];
  
      for(let i = 0; i < input.length; i++)
      {
          let item = input[i].trim();
          let cells = item.split(separator);
          let startIndex = 0;
          let endIndex = 0;
          for(let j = 0; j < cells.length; j++)
          {
              if(cells[j][0] == "\"")
                  startIndex = j;
              else if(cells[j][cells[j].length-1] == "\"")
                  {
                      endIndex = j;
                      let replaceWith = cells.slice(startIndex, endIndex+1).join(separator);
                      cells.splice(startIndex, endIndex-startIndex+1, replaceWith);
                  }
          }
  
          for(let j = 0; j < cells.length; j++)
          {
            if(i > 0)
              cells[j] = cells[j] != "" ? cells[j][0] != "\"" ? "\"" + cells[j] + "\"" : cells[j] : "NULL";
            else
              cells[j] = cells[j] != "" ? cells[j] : "NULL";
          }
          
          output.push(cells.join(","));
      }
  
      let columns = output.splice(0, 1);
  
      return "(" + columns.join(",") + ") VALUES \n(" + output.join("),\n(") + ")";
  }