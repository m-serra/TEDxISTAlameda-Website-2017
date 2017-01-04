function member(line_value, column_value){
    this.line = line_value;
    this.column = column_value;
}

function initialize_team(){

    team_size=27;

    var team = new Array();
    var i;

    for(i=0 ; i<team_size ; i++)
    {
        team[i] = new member());
    }

    return team;
};

function arrayPrint() {

    var team = initialize_team();

    team[1]= member1;
  

    team[0] = member0:


    document.write("ola");

}

arrayPrint();

