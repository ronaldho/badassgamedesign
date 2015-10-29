/* global PF */

var gridWorldArray = new Array();
var currentPlayer = 1;
var playerPos = [[0, 0], [13, 0], [13, 13], [0, 13]];
var playerBombs = [0, 0, 0, 0];
var color = ["fire", "thunder", "earth", "water", "portal", "done", "empty"];
        function tile(xpos, ypos){
          var elem = $(".gameworld tr td[xpos="+ xpos +"][ypos = " +ypos + "]");
          return elem;
        }
        function createWorld(){
            var table = $('<table></table>').addClass('gameworld');
            for (var i = 0; i < 14; i++) {
                  var row = $('<tr></tr>');
                  gridWorldArray[i] = new Array();
                  for (var j = 0; j < 14; j++) {
                      gridWorldArray[i][j] = 0;
                      var rowData = $('<td></td>').addClass('tile').attr("xpos", i).attr("ypos", j).attr("player", 6).attr("usedForBomb", 0);//.text(gridWorldArray[i][j]);
                      row.append(rowData);
                  }
                  table.append(row);
              }
              $('.grid').append(table);
              setPortal();
              //searchForPath();
        }
        function setPortal(){
                updateTile(6, 6, 5);
                updateTile(6, 7, 5);
                updateTile(7, 6, 5);
                updateTile(7, 7, 5);
        }
        function makePath(xpos,ypos){
            updateTile(xpos, ypos, currentPlayer);
            searchForPath();
            nextPlayer();
        }
        function updateTile(xpos, ypos, player) {
                $(tile(xpos, ypos)).addClass(color[player - 1]);//.text(player).attr("player", player);
                gridWorldArray[xpos][ypos] = player;
        }
        function searchForPath(){
            var grid = new PF.Grid(createGridToSearchPath(currentPlayer)); 
            //alert((createGridToSearchPath(currentPlayer)).join("\n"));
            var finder = new PF.AStarFinder(); // input start and end path
            var currentPlayerX = playerPos[currentPlayer - 1][0];
            var currentPlayerY = playerPos[currentPlayer - 1][1];
            var path, i=0;
            while (i == 0) {
                path = finder.findPath(currentPlayerX, currentPlayerY, 6, 6, grid);
                if (path.length > 0)
                        alert(i++ + path.join("\n"));
                path = finder.findPath(currentPlayerX, currentPlayerY, 6, 7, grid);
                if (path.length > 0)
                        alert(i++ + path.join("\n"));
                path = finder.findPath(currentPlayerX, currentPlayerY, 7, 7, grid);
                if (path.length > 0)
                        alert(i++ + path.join("\n"));
                path = finder.findPath(currentPlayerX, currentPlayerY, 7, 7, grid);
                if (path.length > 0)
                        alert(i++ + path.join("\n"));
                i++;
            }    
            if (path.length > 0)
                    alert("Player:" + color[currentPlayer] + " won the game! You can continue competing.");
                //alert(currentPlayer + "\n Found Path:" + path.join("\n"));
        }
        function createPathFromFinder(path){
          var arrayLength = path.length;
            for (var i = 0; i < arrayLength; i++) {
                  //var array2DLength = path[i].length;
                  //for (var j = 0; j < 2; j++) {
                  $(tile(path[i][0], path[i][1])).addClass("done").text("5");
                  //}
            }
        }
        function createGridToSearchPath(player) {
                var tempGrid = new Array();
                for (var i = 0; i < 14; i++) {
                        tempGrid[i] = new Array();
                        for (var j = 0; j < 14; j++) {
                                tempGrid[i][j] = 1;
                                if($(tile(i,j)).attr("player") == player)
                                        tempGrid[i][j] = 0;
                        }
                }
                tempGrid[6][6] = 0;
                tempGrid[6][7] = 0;
                tempGrid[7][6] = 0;
                tempGrid[7][7] = 0;
                console.log(tempGrid);
                return tempGrid;
        }
        function nextPlayer(){
            if ((currentPlayer + 1) <= 4)
                currentPlayer++;
            else
                        currentPlayer = 1;
                
            $(".playerDetails").removeClass("highlight");
            $(".playerDetails:nth-child("+ (currentPlayer) +")").addClass("highlight");
            
        }
        function addBombs(){
                playerBombs[currentPlayer - 1]++;   
        }
        $(document).ready(function () {
                createWorld();
                $(".tile").click(function () {
                        if (!$(this).hasClass("done") && !$(this).hasClass("portal") && !$(this).hasClass("land") && !$(this).hasClass("water") && !$(this).hasClass("air") && !$(this).hasClass("fire")) {
                                makePath($(this).attr("xpos"), $(this).attr("ypos"));
                        }
                        //else
                                //alert("You cannot build here!");
                });
                $("#generatePath").click(searchForPath());
                $("#showPathForPlayer").click(function () { alert((createGridToSearchPath(currentPlayer)).join("\n")) });
        });