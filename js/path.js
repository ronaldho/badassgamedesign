
        var gridWorldArray = new Array();
        var setPortal;
        function tile(xpos, ypos){
          var elem = $(".gameworld tr td[xpos="+ xpos +"][ypos = " +ypos + "]");
          return elem;
        }
        function createWorld(){
            var table = $('<table></table>').addClass('gameworld');
            for (var i = 0; i < 14; i++) {
                  row = $('<tr></tr>');
                  gridWorldArray[i] = new Array();
                  for (var j = 0; j < 14; j++) {
                      gridWorldArray[i][j] = 0;
                      var rowData = $('<td></td>').addClass('tile').attr("xpos",i).attr("ypos", j).text(gridWorldArray[i][j]);
                      row.append(rowData);
                  }
                  table.append(row);
              }
              $('.grid').append(table);
              setPortal();
              createPFGrid();
        }
        function setPortal(){
              $(tile(6,6)).html("P").addClass("portal");
              $(tile(6,7)).html("P").addClass("portal");
              $(tile(7,6)).html("P").addClass("portal");
              $(tile(7,7)).html("P").addClass("portal");
        }
        function makePath(tile){
            $(tile).addClass("path");
        }
        $(document).ready(function() {
            createWorld();
            $(".tile").click(function(){
              makePath($(this));
            });
        });
        function createPFGrid(){
            var grid = new PF.Grid(gridWorldArray); 
            var finder = new PF.AStarFinder();
            var path = finder.findPath(0, 0, 9, 9, grid); // input start and end path
            //alert(path);
            createPathFromFinder(path);
        }
        function createPathFromFinder(path){
          var arrayLength = path.length;
            for (var i = 0; i < arrayLength; i++) {
                  //var array2DLength = path[i].length;
                  //for (var j = 0; j < 2; j++) {
                  $(tile(path[i][0], path[i][1])).addClass("terrain");
                  //}
            }
             
        }