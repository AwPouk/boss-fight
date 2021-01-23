const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';

const enteredValue = prompt('Maximum life for you and the monster', '100');

let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currertMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

// function writeToLog(event) {
//     if ()
// }

function reset() {
  currertMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert(' You would be dead but the bonus life saved You!');
  }

  if (currertMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
    reset();
  } else if (currentPlayerHealth <= 0 && currertMonsterHealth > 0) {
    alert('You lose!');
    reset();
  } else if (currentPlayerHealth <= 0 && currertMonsterHealth <= 0) {
    alert('You have a draw');
    reset();
  }
}

function attackMonster(mode) {
  let maxDamege;
  if (mode === 'ATTACK') {
    maxDamege = ATTACK_VALUE;
  } else if (mode === 'STRONG_ATTACK') {
    maxDamege = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamege);
  currertMonsterHealth -= damage;
  endRound();
}

function attackHandler() {
  attackMonster('ATTACK');
}

function StrongAttackHandler() {
  attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
  let healValue = 100;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max heak bar");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', StrongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
