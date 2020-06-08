//Player Class that houses information about the player 
 class Player {
    constructor(name, socket_id) {
        this.socket_id = socket_id;
        //holds id of room that player is currently a part of
        this.roomId = null;
        this.hand = [];
        this.name = name;
        this.points = 0;
    }

    //allows to set a name/username for player obj (will be taken from actual username later)
    setName(name) {
        this.name = name;
    }
}

//export the player class to be used by other server files
module.exports = {
    Player: Player,
}