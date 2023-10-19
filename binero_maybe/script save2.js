


// STORED GRIDS 
const STORED_GRID_0=[2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,2,2,];

const STORED_GRID_1=[1,2,2,2,2,2,2,2,2,2,
    0,0,2,2,2,2,2,0,2,2,
    2,2,2,0,0,2,2,2,2,1,
    2,2,2,2,2,2,2,1,1,2,
    2,0,2,1,2,2,2,2,2,2,
    2,2,1,1,2,2,2,0,2,0,
    2,2,2,2,2,2,2,2,1,2,
    1,2,2,2,1,1,2,2,2,0,
    0,2,0,2,2,1,1,2,2,2,
    2,0,0,2,2,2,1,1,2,2];

const STORED_GRID_2=[0,2,2,0,0,2,2,2,2,0,
    0,2,2,2,0,2,2,1,1,2,
    2,2,2,2,2,2,2,0,0,2,
    0,2,0,0,2,2,2,2,2,0,
    2,1,2,2,2,2,1,2,2,2,
    2,2,0,2,0,2,2,2,1,2,
    1,1,2,2,2,2,2,2,2,2,
    2,2,2,2,2,2,2,2,1,1,
    1,2,1,2,1,2,1,2,2,1,
    2,0,2,2,1,2,1,2,2,2,];



// CONSTANTS DECLARATIONS
const   GAME_GRID_TABLE = document.querySelector("#GameGrid");

let     Grid_Generation_HTML_Code = "";
let     Generic_Cell_Content="X";
let     Grid_Size = "10";
let     stored_current_grid = [];
let     Level_Grid = STORED_GRID_2; //              <<<--- ICI POUR CHANGER LE NIVEAU


// FUNCTIONS DECLARATIONS

function change_data_value(){
    let current_data_value = event.target.getAttribute("data_value")
    if (current_data_value === "2"){
        current_data_value="0";
    } else {
        current_data_value++
    }
    event.target.setAttribute("data_value", `${current_data_value}`);
    event.target.innerHTML= `${current_data_value}`;
}



function clicked_tile(){
    reset_errors_to_0();
    change_data_value();
    check_rows();
}

function Generate_Grid_Binero() {

    Delete_Grid_Binero()
    id_nb_generation = 0;

    for (let i = 0; i < Grid_Size; i++) {

        Grid_Generation_HTML_Code += `<tr>`;

        for (let j = 0; j < Grid_Size; j++) {

            if (Level_Grid[id_nb_generation] !== 2){
                Grid_Generation_HTML_Code += ` <td id="${id_nb_generation}" class="cell" data_value="${Level_Grid[id_nb_generation]}" cell_row="${i}" cell_col="${j}" error="0" clickable="0">                           ${Level_Grid[id_nb_generation]} </td>`;
            } else {
                Grid_Generation_HTML_Code += ` <td id="${id_nb_generation}" class="cell" data_value="${Level_Grid[id_nb_generation]}" cell_row="${i}" cell_col="${j}" error="0" clickable="1" onclick="clicked_tile()">  ${Level_Grid[id_nb_generation]} </td>`;
            }

            id_nb_generation++
        }

        Grid_Generation_HTML_Code += `</tr>`;
    }
}

function Display_Grid_Binero(){
    Generate_Grid_Binero(10);
    GAME_GRID_TABLE.innerHTML = Grid_Generation_HTML_Code;
}

function reset_errors_to_0(){
    for (let i = 0; i < Level_Grid.length; i++) {
        document.getElementById(i).setAttribute("error", "0");
    }
}

function refresh_data_value(){
    let current_data_value = event.target.getAttribute("data_value")
    event.target.innerHTML= `${current_data_value}`;
}

function Reset_grid(){
    reset_errors_to_0();
    for (let i = 0; i < Level_Grid.length; i++) {
        document.getElementById(i).setAttribute("data_value", `${Level_Grid[i]}`);
    }
    refresh_data_value;
}

function Delete_Grid_Binero(){
    Grid_Generation_HTML_Code = "";
    GAME_GRID_TABLE.innerHTML = Grid_Generation_HTML_Code;
}

function Change_Level(Level_Name){
    Delete_Grid_Binero();
    Level_Grid = Level_Name;
    Display_Grid_Binero();
}

function get_current_grid_state(){
    stored_current_grid = [];
    for (let i = 0; i < Level_Grid.length; i++) {
        let current_data_value = document.getElementById(i).getAttribute("data_value")
        stored_current_grid.push(current_data_value);
    }

    console.log(stored_current_grid);
}

function check_rows(){
    get_current_grid_state();

    let starting_slice = 0;
    let end_slice = 10;

    for (let i = 0; i < Grid_Size; i++) {
        let nb_of_0 = [];
        let nb_of_1 = [];

        currently_checked_lines = stored_current_grid.slice(starting_slice, end_slice)
        
        for (let j = 0; j < currently_checked_lines.length; j++) {
            if (currently_checked_lines[j] === "0") {nb_of_0.push(0);}
            if (currently_checked_lines[j] === "1") {nb_of_1.push(1);}
        }

        if (nb_of_0.length > 5 || nb_of_1.length > 5) {

            for (let k = 0; k < Grid_Size; k++) {
                if (document.getElementById(starting_slice+k).getAttribute("data_value") !== "2"){
                    document.getElementById(starting_slice+k).setAttribute("error", `${1}`);
                }
            }

            console.log(`Error on line ${i}`);
        }
    
        starting_slice += 10;
        end_slice += 10;
    }
}




// CORE CODE

Display_Grid_Binero();




