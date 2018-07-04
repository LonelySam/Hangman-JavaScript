let id = 1;

class Game {
  constructor()
  {
      this.id = id;
      this.hint = '';
      this.leftAttempts = 5;
      id++;
  }
  //Funciones van fuera de constructor
  create()
  {
      console.log('GameCreated');
  }
}
