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

const STORED_GRID_3=[   2,2,1,1,2,2,2,2,0,2,
                        1,0,2,1,2,0,2,0,0,2,
                        2,2,0,2,2,2,1,2,2,2,
                        2,2,2,2,1,2,2,2,2,2,
                        0,2,0,2,2,0,2,2,1,1,
                        2,1,2,2,2,2,1,1,2,2,
                        1,2,2,1,2,2,2,2,2,2,
                        2,2,0,2,2,2,0,2,2,2,
                        2,2,0,2,2,1,2,2,2,0,
                        0,2,2,2,1,2,2,1,2,2,];

const STORED_GRID_4=[   1,2,2,1,2,0,0,2,0,0,
                        0,0,2,2,2,2,2,2,2,2,
                        2,2,2,2,1,2,2,1,2,2,
                        0,2,0,2,2,2,1,1,2,2,
                        2,2,0,2,2,2,2,2,0,2,
                        2,2,2,2,0,2,2,1,2,2,
                        1,2,2,1,2,2,2,2,2,0,
                        2,2,1,1,2,2,0,2,2,2,
                        2,2,2,2,0,2,0,2,1,1,
                        2,1,2,2,2,2,2,2,1,2,];

const STORED_GRID_5=[   0,2,2,0,2,2,1,2,1,2,
                        2,1,2,2,2,0,2,2,0,0,
                        1,2,2,0,2,0,2,1,2,2,
                        2,0,2,1,2,2,2,2,0,2,
                        1,0,2,2,2,0,2,2,2,1,
                        1,2,2,2,2,2,1,2,2,2,
                        2,2,2,2,2,2,2,1,2,2,
                        2,2,2,2,2,2,2,2,2,0,
                        0,0,2,2,1,2,1,2,1,2,
                        2,2,2,0,0,2,2,0,2,0,];

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
    
    id_nb_generation=0;

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
    console.clear();
    Reset_Errors_To_0();
    Change_Data_Value();
    Check_Each_Column();
    Check_Each_Row();
    Check_For_Identical_Columns();
    Check_For_Identical_Rows();
    Check_For_Triples();
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
    for (let i = 0; i < grid_size; i++) {
    curently_checked_col_values = document.querySelectorAll(`#GameGrid * td[cell_col="${i}"]`);
    
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

        console.log(`Error on column ${i}`);
    }
    
    }


}

function Check_Each_Row(){
    for (let i = 0; i < grid_size; i++) {
    curently_checked_row_values = document.querySelectorAll(`#GameGrid * td[cell_row="${i}"]`);
    
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
    }


}

function Check_For_Identical_Columns(){

    let all_columns_for_comparison =[[],[],[],[],[],[],[],[],[],[]];

    for (let i = 0; i < grid_size; i++) {
        curently_checked_col_id = document.querySelectorAll(`#GameGrid * td[cell_col="${i}"]`);

        for (let j = 0; j < grid_size ; j++) {
            all_columns_for_comparison[i].push(curently_checked_col_id[j].getAttribute("data_value"));
        } 
    }

    for (let k = 0; k < grid_size - 1; k++) {

        for (let m = k+1; m < grid_size; m++) {
            if (all_columns_for_comparison[k].toString() == all_columns_for_comparison[m].toString()){
                console.log(`col ${k} and col ${m} are identical`);
                
                let identical_column_a = document.querySelectorAll(`#GameGrid * td[cell_col="${m}"]`);
                let identical_column_b = document.querySelectorAll(`#GameGrid * td[cell_col="${k}"]`);

                for (let v = 0; v < grid_size; v++) {
                    if (identical_column_a[v].getAttribute("data_value") !== "2"){
                        identical_column_a[v].setAttribute("error", `${1}`);
                    }

                    if (identical_column_b[v].getAttribute("data_value") !== "2"){
                        identical_column_b[v].setAttribute("error", `${1}`);
                    }
                }
            }
        }

    }
    
}

function Check_For_Identical_Rows(){

    let all_rows_for_comparison =[[],[],[],[],[],[],[],[],[],[]];

    for (let i = 0; i < grid_size; i++) {
        curently_checked_row_id = document.querySelectorAll(`#GameGrid * td[cell_row="${i}"]`);

        for (let j = 0; j < grid_size ; j++) {
            all_rows_for_comparison[i].push(curently_checked_row_id[j].getAttribute("data_value"));
        } 
    }

    for (let k = 0; k < grid_size - 1; k++) {

        for (let m = k+1; m < grid_size; m++) {
            if (all_rows_for_comparison[k].toString() == all_rows_for_comparison[m].toString()){
                console.log(`row ${k} and row ${m} are identical`);
                
                let identical_row_a = document.querySelectorAll(`#GameGrid * td[cell_row="${m}"]`);
                let identical_row_b = document.querySelectorAll(`#GameGrid * td[cell_row="${k}"]`);

                for (let v = 0; v < grid_size; v++) {
                    if (identical_row_a[v].getAttribute("data_value") !== "2"){
                        identical_row_a[v].setAttribute("error", `${1}`);
                    }

                    if (identical_row_b[v].getAttribute("data_value") !== "2"){
                        identical_row_b[v].setAttribute("error", `${1}`);
                    }
                }
            }
        }

    }
    
}

function Check_For_Triples(){
    c_chkd_id = 0;
    while (c_chkd_id < grid_size * grid_size) {
        let c_chkd_id_r_of = c_chkd_id + 1;
        let c_chkd_id_l_of = c_chkd_id - 1;

        if ((c_chkd_id%10) != 0 && (c_chkd_id%10) != 9) {
            c_chkd_id_value =      document.getElementById(c_chkd_id).getAttribute("data_value");
            c_chkd_id_value_r_of = document.getElementById(c_chkd_id_r_of).getAttribute("data_value");
            c_chkd_id_value_l_of = document.getElementById(c_chkd_id_l_of).getAttribute("data_value");

            if (c_chkd_id_value_l_of === c_chkd_id_value && c_chkd_id_value === c_chkd_id_value_r_of && c_chkd_id_value !== "2") {

                console.log(`The cells with ids ${c_chkd_id_l_of}, ${c_chkd_id} and ${c_chkd_id_r_of} are identical`);
                console.log(`Their values are ${c_chkd_id_value_l_of}, ${c_chkd_id_value} and ${c_chkd_id_value_r_of}`);

                document.getElementById(c_chkd_id).setAttribute("error", `${1}`);
                document.getElementById(c_chkd_id_l_of).setAttribute("error", `${1}`);
                document.getElementById(c_chkd_id_r_of).setAttribute("error", `${1}`);
            }
        }    

        let c_chkd_id_t_of = c_chkd_id - 10;
        let c_chkd_id_b_of = c_chkd_id + 10;
        
        if (c_chkd_id >= 10 && c_chkd_id <= 89) {
            c_chkd_id_value =      document.getElementById(c_chkd_id).getAttribute("data_value");
            c_chkd_id_value_t_of = document.getElementById(c_chkd_id_t_of).getAttribute("data_value");
            c_chkd_id_value_b_of = document.getElementById(c_chkd_id_b_of).getAttribute("data_value");

            if (c_chkd_id_value_b_of === c_chkd_id_value && c_chkd_id_value === c_chkd_id_value_t_of && c_chkd_id_value !== "2") {

                console.log(`The cells with ids ${c_chkd_id_t_of}, ${c_chkd_id} and ${c_chkd_id_b_of}`);
                console.log(`Their values are ${c_chkd_id_value_t_of}, ${c_chkd_id_value} and ${c_chkd_id_value_b_of} are identical`);
                
                document.getElementById(c_chkd_id).setAttribute("error", `${1}`);
                document.getElementById(c_chkd_id_t_of).setAttribute("error", `${1}`);
                document.getElementById(c_chkd_id_b_of).setAttribute("error", `${1}`);
            }
        }  
        

        c_chkd_id++;
    }

}

// CORE CODE-------------------------------------------------------------------------------------------------------------

Display_Grid_Binero();
