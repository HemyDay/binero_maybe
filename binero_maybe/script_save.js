


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

function refresh_data_value(){
    let current_data_value = event.target.getAttribute("data_value")
    event.target.innerHTML= `${current_data_value}`;
}

function clicked_tile(){
    change_data_value()
}

function Generate_Grid_Binero(Grid_Size) {

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

function Reset_grid(){
    for (let i = 0; i < Level_Grid.length; i++) {
        document.getElementById(i).setAttribute("data_value", `${Level_Grid[i]}`);
    }
    refresh_data_value;
}

// CORE CODE

Generate_Grid_Binero(10);
GAME_GRID_TABLE.innerHTML = Grid_Generation_HTML_Code;

