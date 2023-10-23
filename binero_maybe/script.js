// STORED GRIDS----------------------------------------------------------------------------------------------------------

const STORED_GRID_1=[   1,2,2,2,2,2,2,2,2,2,
                        0,0,2,2,2,2,2,0,2,2,
                        2,2,2,0,0,2,2,2,2,1,
                        2,2,2,2,2,2,2,1,1,2,
                        2,0,2,1,2,2,2,2,2,2,
                        2,2,1,1,2,2,2,0,2,0,
                        2,2,2,2,2,2,2,2,1,2,
                        1,2,2,2,1,1,2,2,2,0,
                        0,2,0,2,2,1,1,2,2,2,
                        2,0,0,2,2,2,1,1,2,2];

const STORED_GRID_2=[   0,2,2,0,0,2,2,2,2,0,
                        0,2,2,2,0,2,2,1,1,2,
                        2,2,2,2,2,2,2,0,0,2,
                        0,2,0,0,2,2,2,2,2,0,
                        2,1,2,2,2,2,1,2,2,2,
                        2,2,0,2,0,2,2,2,1,2,
                        1,1,2,2,2,2,2,2,2,2,
                        2,2,2,2,2,2,2,2,1,1,
                        1,2,1,2,1,2,1,2,2,1,
                        2,0,2,2,1,2,1,2,2,2,];



// VARIABLES DECLARATIONS------------------------------------------------------------------------------------------------
const   GAME_GRID_TABLE = document.querySelector("#GameGrid");  // The table where the game will be displayed

let     grid_generation_HTML_Code = "";                         // Empty String that wil host the HTML code for each of tht cells
let     generic_cell_content="X";                               // The generic content of each cell (should never display, if everything goes according to plan)
let     grid_size = "10";                                       // The size of the grid
let     stored_current_grid =[[],[],[],[],[],[],[],[],[],[]]    // Array that stores the current state of the grid
let     level_grid = STORED_GRID_2;                             // The default level choice

// FUNCTIONS DECLARATIONS------------------------------------------------------------------------------------------------
function Generate_Grid_Binero_HTML_Content(){
    Delete_Grid_Binero()
    id_nb_generation = 0;

    for (let i = 0; i < grid_size; i++) {

        grid_generation_HTML_Code += `<tr>`;

        for (let j = 0; j < grid_size; j++) {

            if (level_grid[id_nb_generation] !== 2){
                grid_generation_HTML_Code += ` <td id="${id_nb_generation}" class="cell" data_value="${level_grid[id_nb_generation]}" cell_row="${i}" cell_col="${j}" error="0" clickable="0">                           ${level_grid[id_nb_generation]} </td>`;
            } else {
                grid_generation_HTML_Code += ` <td id="${id_nb_generation}" class="cell" data_value="${level_grid[id_nb_generation]}" cell_row="${i}" cell_col="${j}" error="0" clickable="1" onclick="Clicked_Tile()">  ${level_grid[id_nb_generation]} </td>`;
            }

            id_nb_generation++
        }

        grid_generation_HTML_Code += `</tr>`;
    }
}

function Display_Grid_Binero(){

    Generate_Grid_Binero_HTML_Content();
    GAME_GRID_TABLE.innerHTML = grid_generation_HTML_Code;

}

function Reset_Errors_To_0(){
    for (let i = 0; i < level_grid.length; i++) {
        document.getElementById(i).setAttribute("error", "0");
    }
}

function Refresh_Data_Value(){
    let current_data_value = event.target.getAttribute("data_value")
    event.target.innerHTML= `${current_data_value}`;
}

function Change_Data_Value(){
    let current_data_value = event.target.getAttribute("data_value")
    if (current_data_value === "2"){
        current_data_value="0";
    } else {
        current_data_value++
    }
    event.target.setAttribute("data_value", `${current_data_value}`);
    event.target.innerHTML= `${current_data_value}`;
}

function Delete_Grid_Binero(){
    grid_generation_HTML_Code = "";
    GAME_GRID_TABLE.innerHTML = grid_generation_HTML_Code;
}

function Reset_Grid_Content(){
    Reset_Errors_To_0();
    for (let i = 0; i < level_grid.length; i++) {
        document.getElementById(i).setAttribute("data_value", `${level_grid[i]}`);
    }
    Refresh_Data_Value;
}

function Clicked_Tile(){
    Reset_Errors_To_0();
    Change_Data_Value();
    Check_Each_Column();
    Check_Each_Row();
}

function Change_Level(level_name){
    Delete_Grid_Binero();
    level_grid = level_name;
    Display_Grid_Binero();
}

function Get_Current_Grid_State(){
    currently_checked_id =0;
    
    for (let i = 0; i < grid_size; i++) {
        for (let j = 0; j < grid_size; j++) {
            let current_data_value = document.getElementById(currently_checked_id).getAttribute("data_value")
            stored_current_grid[i][j] = current_data_value;
            currently_checked_id++;
        }     
    }
    console.log(stored_current_grid);
}

function Check_Each_Column(){
    let curently_checked_col = 0;

    for (let i = 0; i < grid_size; i++) {
    curently_checked_col_values = document.querySelectorAll(`#GameGrid * td[cell_col="${curently_checked_col}"]`);
    
    let nb_of_0 = [];
    let nb_of_1 = [];

    for (let j = 0; j < curently_checked_col_values.length; j++){
        
        if (curently_checked_col_values[j].getAttribute("data_value") === "0") {nb_of_0.push(0);}    
        if (curently_checked_col_values[j].getAttribute("data_value") === "1") {nb_of_1.push(1);}

    };

    if (nb_of_0.length > 5 || nb_of_1.length > 5) {

        for (let k = 0; k < grid_size; k++) {
            if (curently_checked_col_values[k].getAttribute("data_value") !== "2"){
                curently_checked_col_values[k].setAttribute("error", `${1}`);
            }
        }

        console.log(`Error on line ${i}`);
    }
    
    console.log(nb_of_0,nb_of_1);
    
    curently_checked_col++ ;
    }


}

function Check_Each_Row(){
    let curently_checked_row = 0;

    for (let i = 0; i < grid_size; i++) {
    curently_checked_row_values = document.querySelectorAll(`#GameGrid * td[cell_row="${curently_checked_row}"]`);
    
    let nb_of_0 = [];
    let nb_of_1 = [];

    for (let j = 0; j < curently_checked_row_values.length; j++){
        
        if (curently_checked_row_values[j].getAttribute("data_value") === "0") {nb_of_0.push(0);}    
        if (curently_checked_row_values[j].getAttribute("data_value") === "1") {nb_of_1.push(1);}

    };

    if (nb_of_0.length > 5 || nb_of_1.length > 5) {

        for (let k = 0; k < grid_size; k++) {
            if (curently_checked_row_values[k].getAttribute("data_value") !== "2"){
                curently_checked_row_values[k].setAttribute("error", `${1}`);
            }
        }

        console.log(`Error on line ${i}`);
    }
    
    console.log(nb_of_0,nb_of_1);
    
    curently_checked_row++ ;
    }


}

// CORE CODE-------------------------------------------------------------------------------------------------------------

Display_Grid_Binero();