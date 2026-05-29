/* ============================================================
   APTITUDE — 横画面カードバトル
   ============================================================ */

// ---------- 属性 ----------
const ELEMENT_ICON = { fire: '🔥', water: '💧', wind: '💨', earth: '🪨', none: '✦' };
const ELEMENT_NAME = { fire: '火',  water: '水',  wind: '風',  earth: '土',  none: '無' };
const ELEMENT_LIST = ['fire', 'water', 'wind', 'earth'];

// ---------- キャラクター ----------
const CHARACTER_POOL = [
  { id: 'rio',     name: '炎使いリオ',   emoji: '🧑‍🚒', desc: '炎の達人。爆発的火力で押し切る', aptitude: { fire: 92, wind: 58, earth: 31, water: 12 } },
  { id: 'kai',     name: '風読みカイ',   emoji: '🦅', desc: '俊敏な風使い。手数で攻める',     aptitude: { wind: 88, earth: 61, water: 35, fire: 15 } },
  { id: 'mizuha',  name: '水巫女ミズハ', emoji: '🧜', desc: '安定した水の使い手',             aptitude: { water: 90, earth: 55, wind: 33, fire: 18 } },
  { id: 'gounaga', name: '岩石ゴウナガ', emoji: '🗿', desc: '重く硬い一撃の岩戦士',           aptitude: { earth: 89, fire: 56, water: 32, wind: 14 } },
  { id: 'sayuri',  name: '霧雨サユリ',   emoji: '🧚', desc: '風と水の複合に強い機動型',       aptitude: { wind: 76, water: 70, fire: 28, earth: 16 } },
];

// ---------- カード ----------
const CARDS = [
  { id: 'fireball',    name: '火球',    emoji: '🔥', element: ['fire'],  baseCost: 5,  basePower: 20, rarity: 'normal', desc: '単体攻撃' },
  { id: 'great_fire',  name: '大火炎',  emoji: '🌋', element: ['fire'],  baseCost: 12, basePower: 50, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'flame_dance', name: '炎舞',    emoji: '💥', element: ['fire'],  baseCost: 7,  basePower: 18, hits: 2, rarity: 'normal', desc: '2回攻撃' },
  { id: 'water_bullet',name: '水弾',    emoji: '💧', element: ['water'], baseCost: 5,  basePower: 20, rarity: 'normal', desc: '単体攻撃' },
  { id: 'tsunami',     name: '津波',    emoji: '🌊', element: ['water'], baseCost: 12, basePower: 50, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'rain_arrow',  name: '雨矢',    emoji: '🏹', element: ['water'], baseCost: 7,  basePower: 17, hits: 2, rarity: 'normal', desc: '2回攻撃' },
  { id: 'wind_blade',  name: '風刃',    emoji: '🌪️', element: ['wind'],  baseCost: 6,  basePower: 20, rarity: 'normal', desc: '単体攻撃' },
  { id: 'twin_blade',  name: '連風刃',  emoji: '🍃', element: ['wind'],  baseCost: 8,  basePower: 25, hits: 2, rarity: 'normal', desc: '2回攻撃' },
  { id: 'gale',        name: '疾風',    emoji: '💨', element: ['wind'],  baseCost: 10, basePower: 42, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'rock_throw',  name: '岩投げ',  emoji: '🪨', element: ['earth'], baseCost: 8,  basePower: 25, rarity: 'normal', desc: '単体攻撃' },
  { id: 'rock_fall',   name: '岩盤崩落',emoji: '⛰️', element: ['earth'], baseCost: 14, basePower: 55, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'sand_burst',  name: '砂礫弾',  emoji: '🏜️', element: ['earth'], baseCost: 6,  basePower: 18, rarity: 'normal', desc: '単体攻撃' },
  { id: 'focus',       name: '集中',    emoji: '🎯', element: ['none'],  baseCost: 3,  basePower: 0,  rarity: 'normal', desc: '次の攻撃+20', special: 'focus' },
  // レア（2属性複合）
  { id: 'steam_blast', name: '蒸気爆発',emoji: '♨️', element: ['fire','water'], costElement: 'water', powerElement: 'fire', baseCost: 10, basePower: 60, rarity: 'rare', desc: '火で威力/水でコスト' },
  { id: 'storm_blade', name: '嵐の刃',  emoji: '⛈️', element: ['wind','water'], costElement: 'wind',  powerElement: 'water',baseCost: 10, basePower: 60, rarity: 'rare', desc: '水で威力/風でコスト' },
  { id: 'magma_strike',name: 'マグマ撃',emoji: '🌋', element: ['fire','earth'], costElement: 'earth', powerElement: 'fire', baseCost: 10, basePower: 60, rarity: 'rare', desc: '火で威力/土でコスト' },
  { id: 'wind_quake',  name: '風震',    emoji: '🌀', element: ['wind','earth'], costElement: 'earth', powerElement: 'wind', baseCost: 10, basePower: 60, rarity: 'rare', desc: '風で威力/土でコスト' },
  { id: 'tidal_quake', name: '津波震',  emoji: '💠', element: ['water','earth'],costElement: 'earth', powerElement: 'water',baseCost: 10, basePower: 60, rarity: 'rare', desc: '水で威力/土でコスト' },
  { id: 'cinder_gust', name: '火種旋風',emoji: '🎆', element: ['fire','wind'],  costElement: 'wind',  powerElement: 'fire', baseCost: 10, basePower: 60, rarity: 'rare', desc: '火で威力/風でコスト' },
  // 覚醒専用
  { id: 'limit_break_fire',  name: '限界超越', emoji: '⚡', element: ['fire'],  baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ' },
  { id: 'limit_break_water', name: '深淵解放', emoji: '🌌', element: ['water'], baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ' },
  { id: 'limit_break_wind',  name: '颶風一閃', emoji: '🌟', element: ['wind'],  baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ' },
  { id: 'limit_break_earth', name: '大地震撼', emoji: '💎', element: ['earth'], baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ' },
];
const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));

// ---------- 敵 ----------
const ENEMIES = {
  water_slime:  { name: '水スライム',   emoji: '🟦', hp: 60,  weakness: 'fire',  resistance: 'wind',  element: 'water', gold: 6  },
  wind_sprite:  { name: '風の精霊',     emoji: '🦋', hp: 70,  weakness: 'earth', resistance: 'fire',  element: 'wind',  gold: 7  },
  earth_pebble: { name: '小石ゴーレム', emoji: '🗿', hp: 90,  weakness: 'water', resistance: 'earth', element: 'earth', gold: 7  },
  fire_imp:     { name: '火の小鬼',     emoji: '👺', hp: 110, weakness: 'water', resistance: 'wind',  element: 'fire',  gold: 9  },
  water_serpent:{ name: '水大蛇',       emoji: '🐉', hp: 130, weakness: 'wind',  resistance: 'water', element: 'water', gold: 10 },
  thunder_kite: { name: '雷鳥',         emoji: '🦅', hp: 140, weakness: 'earth', resistance: 'wind',  element: 'wind',  gold: 10 },
  boss_chimera: { name: '四元キメラ',   emoji: '👹', hp: 320, weakness: 'wind',  resistance: 'fire',  element: 'all',   gold: 0, isBoss: true },
};

// ---------- ステージ ----------
const STAGE_ORDER = [
  { type: 'combat', enemyId: 'water_slime',   label: '1-1', turns: 2 },
  { type: 'combat', enemyId: 'wind_sprite',   label: '1-2', turns: 3 },
  { type: 'combat', enemyId: 'earth_pebble',  label: '1-3', turns: 3 },
  { type: 'reward', label: '報酬' },
  { type: 'combat', enemyId: 'fire_imp',      label: '2-1', turns: 3 },
  { type: 'combat', enemyId: 'water_serpent', label: '2-2', turns: 4 },
  { type: 'combat', enemyId: 'thunder_kite',  label: '2-3', turns: 4 },
  { type: 'shop',   label: 'ショップ' },
  { type: 'combat', enemyId: 'boss_chimera',  label: 'BOSS', isBoss: true, turns: 6 },
];

const STARTER_DECK_IDS = ['fireball','fireball','water_bullet','water_bullet','wind_blade','wind_blade','rock_throw','focus'];

// ============================================================
//   状態
// ============================================================
const state = {
  character: null, deck: [], drawPile: [], discardPile: [], hand: [],
  queue: [], executing: false,
  mp: 40, mpMax: 40, focusBuff: false,
  enemy: null, enemyMaxHp: 0,
  stageIndex: 0, gold: 0,
  turnsLeft: 0, maxTurns: 0,
};
let _nextInstanceId = 1;
const mkInstance = (cardId) => ({ instanceId: _nextInstanceId++, cardId });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const $ = (id) => document.getElementById(id);

// ============================================================
//   サウンド（Web Audio で合成、ファイル不要）
// ============================================================
const SOUND = {
  ctx: null,
  muted: localStorage.getItem('aptitude_muted') === '1',
  init() {
    if (!this.ctx) {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { this.ctx = null; }
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },
  tone(freq, dur, type = 'sine', vol = 0.2, delay = 0) {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(t); osc.stop(t + dur);
  },
  slide(f1, f2, dur, type = 'sawtooth', vol = 0.2) {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, t);
    osc.frequency.exponentialRampToValueAtTime(f2, t + dur);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(t); osc.stop(t + dur);
  },
  noise(dur, vol = 0.2) {
    if (this.muted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const buf = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const gain = this.ctx.createGain(); gain.gain.setValueAtTime(vol, t);
    const filt = this.ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 1200;
    src.connect(filt); filt.connect(gain); gain.connect(this.ctx.destination);
    src.start(t);
  },
  sfx(name) {
    if (this.muted || !this.ctx) return;
    switch (name) {
      case 'select': this.tone(880, 0.06, 'square', 0.12); break;
      case 'deselect': this.tone(440, 0.06, 'square', 0.1); break;
      case 'fire':  this.noise(0.25, 0.25); this.slide(300, 120, 0.25, 'sawtooth', 0.15); break;
      case 'water': this.slide(700, 300, 0.2, 'sine', 0.18); this.noise(0.15, 0.1); break;
      case 'wind':  this.slide(900, 1600, 0.18, 'triangle', 0.15); break;
      case 'earth': this.tone(90, 0.22, 'square', 0.3); this.noise(0.2, 0.2); break;
      case 'none':  this.tone(660, 0.12, 'triangle', 0.15); this.tone(990, 0.12, 'triangle', 0.12, 0.06); break;
      case 'hit':   this.tone(140, 0.12, 'square', 0.25); break;
      case 'weak':  this.tone(180, 0.18, 'square', 0.3); this.tone(360, 0.18, 'square', 0.2, 0.02); break;
      case 'resist':this.tone(200, 0.1, 'sine', 0.1); break;
      case 'awaken':[523,659,784,1047].forEach((f,i)=>this.tone(f,0.5,'triangle',0.22,i*0.08)); break;
      case 'combo': this.tone(700 + Math.random()*200, 0.08, 'square', 0.12); break;
      case 'gold':  this.tone(1318, 0.08, 'square', 0.15); this.tone(1760, 0.1, 'square', 0.12, 0.06); break;
      case 'win':   [523,659,784,1047,1319].forEach((f,i)=>this.tone(f,0.55,'triangle',0.25,i*0.13)); break;
      case 'lose':  this.slide(440, 110, 1.0, 'sawtooth', 0.25); break;
      case 'error': this.tone(160, 0.15, 'square', 0.18); break;
      case 'turn':  this.tone(520, 0.08, 'sine', 0.12); break;
    }
  },
  toggle() {
    this.muted = !this.muted;
    localStorage.setItem('aptitude_muted', this.muted ? '1' : '0');
    updateMuteButtons();
    if (!this.muted) { this.init(); this.sfx('select'); }
  }
};
function updateMuteButtons() {
  const icon = SOUND.muted ? '🔇' : '🔊';
  ['mute-btn', 'mute-btn-title'].forEach(id => { const b = $(id); if (b) b.textContent = icon; });
}

// ============================================================
//   セーブデータ（localStorage）
//   - META: 永続データ（遊ぶほど増える記録・図鑑）
//   - RUN : ラン途中状態（全滅 or クリアで破棄）
// ============================================================
const SAVE = {
  META_KEY: 'aptitude_meta',
  RUN_KEY: 'aptitude_run',
  defaultMeta() {
    return { plays: 0, wins: 0, bestStageIdx: -1, bestStageLabel: '—',
      totalKills: 0, totalAwakenings: 0, maxCombo: 0,
      charsSeen: [], enemiesSlain: [], cardsFound: [] };
  },
  loadMeta() {
    try { return Object.assign(this.defaultMeta(), JSON.parse(localStorage.getItem(this.META_KEY) || '{}')); }
    catch (e) { return this.defaultMeta(); }
  },
  saveMeta(m) { try { localStorage.setItem(this.META_KEY, JSON.stringify(m)); } catch (e) {} },
  loadRun() { try { return JSON.parse(localStorage.getItem(this.RUN_KEY) || 'null'); } catch (e) { return null; } },
  saveRun(o) { try { localStorage.setItem(this.RUN_KEY, JSON.stringify(o)); } catch (e) {} },
  clearRun() { try { localStorage.removeItem(this.RUN_KEY); } catch (e) {} },
  hasRun() { return !!this.loadRun(); },
  resetAll() { try { localStorage.removeItem(this.META_KEY); localStorage.removeItem(this.RUN_KEY); } catch (e) {} },
};
let META = SAVE.loadMeta();

const addToSet = (arr, id) => { if (id && !arr.includes(id)) arr.push(id); };
function recordCardsFound(ids) { ids.forEach(id => addToSet(META.cardsFound, id)); SAVE.saveMeta(META); }

// ラン状態のスナップショット保存（screen = combat | reward | shop）
function saveRun(screen) {
  saveRun.lastScreen = screen;
  SAVE.saveRun({ screen, state: {
    character: state.character, deck: state.deck,
    drawPile: state.drawPile, discardPile: state.discardPile, hand: state.hand,
    mp: state.mp, mpMax: state.mpMax, focusBuff: state.focusBuff,
    enemy: state.enemy, enemyMaxHp: state.enemyMaxHp,
    stageIndex: state.stageIndex, gold: state.gold,
    turnsLeft: state.turnsLeft, maxTurns: state.maxTurns,
  }});
}

function resumeRun() {
  const run = SAVE.loadRun();
  if (!run) return;
  Object.assign(state, run.state);
  state.executing = false;
  state.queue = [];
  SOUND.init();
  if (run.screen === 'reward') { showRewardScreen(); }
  else if (run.screen === 'shop') { showShopScreen(); }
  else {
    showScreen('combat-screen');
    updateStageLabel();
    renderCombat();
    setMessage('<span class="msg-system">— 冒険を 再開した —</span>');
  }
}

// ============================================================
//   コアロジック
// ============================================================
function aptToStars(apt) {
  if (apt >= 80) return '★★★★★';
  if (apt >= 60) return '★★★★☆';
  if (apt >= 40) return '★★★☆☆';
  if (apt >= 20) return '★★☆☆☆';
  return '★☆☆☆☆';
}
function calcCost(card, character) {
  if (card.element.length === 1 && card.element[0] === 'none') return card.baseCost;
  if (isAwaken(card, character)) return 0;
  if (card.baseCost === 0) return 0;
  const costEl = card.costElement || card.element[0];
  return Math.max(1, Math.round(card.baseCost * (100 / character.aptitude[costEl])));
}
function calcPower(card, character, withFocus) {
  const powerEl = card.powerElement || card.element[0];
  let bp = card.basePower + (withFocus ? 20 : 0);
  let power = (powerEl === 'none' || powerEl === undefined) ? bp : Math.round(bp * (character.aptitude[powerEl] / 100));
  if (isAwaken(card, character)) power *= 3;
  return power;
}
function isAwaken(card, character) {
  if (card.element.length === 1 && card.element[0] === 'none') return false;
  return character.exhaustion[card.element[0]] >= 100;
}
function elementMultiplier(card, enemy) {
  if (!enemy) return 1;
  const el = card.element[0];
  if (el === 'none') return 1;
  if (enemy.immune === el) return 0;
  if (enemy.weakness === el) return 2.5;
  if (enemy.resistance === el) return 0.25;
  return 1;
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// ============================================================
//   戦闘フロー
// ============================================================
function startCombat(stage) {
  const e = ENEMIES[stage.enemyId];
  state.enemy = { ...e, id: stage.enemyId, currentHp: e.hp };
  state.enemyMaxHp = e.hp;
  state.mp = state.mpMax;
  state.focusBuff = false;
  state.queue = [];
  state.executing = false;
  state.maxTurns = stage.turns;
  state.turnsLeft = stage.turns;
  state.drawPile = shuffle(state.deck.slice());
  state.discardPile = [];
  state.hand = [];
  drawHand();
  renderCombat();
  setMessage(`<span class="msg-system">${e.name}が あらわれた！（${stage.turns}ターン以内に たおせ）</span>`);
  saveRun('combat');
}

function drawHand() {
  const skipped = [];
  while (state.hand.length < 4) {
    if (state.drawPile.length === 0) {
      if (state.discardPile.length === 0) break;
      state.drawPile = shuffle(state.discardPile);
      state.discardPile = [];
    }
    const cardId = state.drawPile.shift();
    const card = CARD_BY_ID[cardId];
    if (card.awakenOnly && state.character.exhaustion[card.element[0]] < 100) { skipped.push(cardId); continue; }
    state.hand.push(mkInstance(cardId));
  }
  state.discardPile.push(...skipped);
}

function endTurn() {
  if (state.executing) return;
  SOUND.sfx('turn');
  state.discardPile.push(...state.hand.map(h => h.cardId));
  state.hand = [];
  state.queue = [];
  state.mp = state.mpMax;
  state.focusBuff = false;
  state.turnsLeft--;
  if (state.turnsLeft <= 0) {
    setMessage('<span class="msg-awaken">ターンが つきた…</span>');
    SOUND.sfx('lose');
    setTimeout(() => showEndScreen(false), 800);
    return;
  }
  drawHand();
  renderCombat();
  setMessage(`<span class="msg-system">ターンを 終えた（残り ${state.turnsLeft}）</span>`);
  saveRun('combat');
}

// ---------- 選択キュー ----------
function getAvailableMP() {
  return state.mp - state.queue.reduce((s, id) => {
    const inst = state.hand.find(h => h.instanceId === id);
    if (!inst) return s;
    return s + calcCost(CARD_BY_ID[inst.cardId], state.character);
  }, 0);
}
function toggleQueue(instanceId) {
  if (state.executing) return;
  const pos = state.queue.indexOf(instanceId);
  if (pos >= 0) { state.queue.splice(pos, 1); SOUND.sfx('deselect'); }
  else {
    const inst = state.hand.find(h => h.instanceId === instanceId);
    if (!inst) return;
    const cost = calcCost(CARD_BY_ID[inst.cardId], state.character);
    if (cost > getAvailableMP()) { SOUND.sfx('error'); return; }
    state.queue.push(instanceId); SOUND.sfx('select');
  }
  renderCombat();
}

// ---------- 発動 ----------
async function executeQueue() {
  if (state.executing || state.queue.length === 0) return;
  state.executing = true;
  const ids = state.queue.slice();
  state.queue = [];
  if (ids.length > META.maxCombo) { META.maxCombo = ids.length; SAVE.saveMeta(META); }
  renderCombat();

  for (let i = 0; i < ids.length; i++) {
    const inst = state.hand.find(h => h.instanceId === ids[i]);
    if (!inst) continue;
    const cardId = inst.cardId;
    // 飛ぶアニメ
    const cardEl = document.querySelector(`.card[data-iid="${ids[i]}"]`);
    if (cardEl) { cardEl.classList.add('firing'); }
    await sleep(160);
    state.hand = state.hand.filter(h => h.instanceId !== ids[i]);
    await playCardEffect(cardId, i + 1, ids.length);
    renderCombat();
    if (state.enemy.currentHp <= 0) break;
    await sleep(ids.length > 1 ? 340 : 120);
  }

  state.executing = false;
  if (state.enemy.currentHp <= 0) onEnemyDefeated();
  else { renderCombat(); saveRun('combat'); }
}

async function playCardEffect(cardId, comboIdx, comboTotal) {
  const card = CARD_BY_ID[cardId];
  const char = state.character;
  const wasAwaken = isAwaken(card, char);
  const cost = calcCost(card, char);
  state.mp = Math.max(0, state.mp - cost);
  state.discardPile.push(cardId);

  if (comboTotal >= 2) { showCombo(comboIdx); SOUND.sfx('combo'); }

  const mainEl = card.element[0];

  // 集中
  if (card.special === 'focus') {
    state.focusBuff = true;
    spawnEffect('none');
    SOUND.sfx('none');
    setMessage(`<span>${char.name}は 集中力を 高めた！</span>`);
    return;
  }

  // 攻撃
  const hits = card.hits || 1;
  const useFocus = state.focusBuff;
  const mult = elementMultiplier(card, state.enemy);
  let totalDmg = 0;

  setMessage(`<span>${char.name}の <strong>${card.emoji}${card.name}</strong>！</span>`);
  SOUND.sfx(mainEl);

  for (let i = 0; i < hits; i++) {
    let dmg = Math.round(calcPower(card, char, useFocus) * mult);
    state.enemy.currentHp = Math.max(0, state.enemy.currentHp - dmg);
    totalDmg += dmg;
    spawnEffect(mainEl);
    spawnParticles(mainEl);
    spawnDamage(dmg, wasAwaken ? 'crit' : (mult >= 2 ? 'weak' : (mult <= 0.5 ? 'resist' : '')));
    enemyHit();
    shakeStage(mult >= 2 || wasAwaken);
    SOUND.sfx(mult >= 2 ? 'weak' : (mult <= 0.5 ? 'resist' : 'hit'));
    updateEnemyHp();
    if (i < hits - 1) await sleep(180);
  }
  if (useFocus) state.focusBuff = false;

  // ヒットワード
  if (mult === 0)      spawnHitWord('効果がない…', true);
  else if (mult >= 2)  spawnHitWord('こうかは ばつぐんだ！', false);
  else if (mult <= 0.5) spawnHitWord('こうかは いまひとつ…', true);

  // メッセージ
  let dmgMsg = `<span class="msg-dmg">${totalDmg}</span>の ダメージ！`;
  if (wasAwaken) dmgMsg = `<span class="msg-awaken">⚡覚醒の一撃！</span> ` + dmgMsg;
  await sleep(120);
  setMessage(`<span>${char.name}の ${card.name}！ ${dmgMsg}</span>`);

  // 苦労値 / 覚醒消費
  if (mainEl !== 'none') {
    if (wasAwaken) {
      char.exhaustion[mainEl] = 0;
    } else {
      const add = Math.max(0, 100 - char.aptitude[mainEl]);
      char.exhaustion[mainEl] = Math.min(100, char.exhaustion[mainEl] + add);
      if (char.exhaustion[mainEl] >= 100) {
        META.totalAwakenings++; SAVE.saveMeta(META);
        flashStage();
        glowPanel();
        SOUND.sfx('awaken');
        spawnHitWord(`${ELEMENT_NAME[mainEl]}の ちからが かくせいした！`, false);
        await sleep(200);
        setMessage(`<span class="msg-awaken">✨ ${char.name}の ${ELEMENT_NAME[mainEl]}が かくせいした！次の${ELEMENT_NAME[mainEl]}は コスト0・威力3倍！</span>`);
      }
    }
  }
}

function showCombo(idx) {
  const layer = $('effect-layer');
  const el = document.createElement('div');
  el.className = 'hit-word';
  el.style.top = '18%';
  el.textContent = `${idx} COMBO!`;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ============================================================
//   エフェクト
// ============================================================
function spawnEffect(element) {
  const layer = $('effect-layer');
  const fx = document.createElement('div');
  const map = { fire: 'fx-burst', water: 'fx-splash', wind: 'fx-slash', earth: 'fx-rock', none: 'fx-focus' };
  fx.className = 'fx ' + (map[element] || 'fx-burst');
  layer.appendChild(fx);
  setTimeout(() => fx.remove(), 600);
  if (element === 'wind') { // 風は複数斬撃
    for (let k = 0; k < 2; k++) {
      const s = document.createElement('div');
      s.className = 'fx fx-slash';
      s.style.top = (28 + k * 12) + '%';
      s.style.animationDelay = (k * 0.08) + 's';
      layer.appendChild(s);
      setTimeout(() => s.remove(), 600);
    }
  }
}
function spawnParticles(element) {
  const layer = $('effect-layer');
  const colors = { fire: ['#ff6b35','#ffd166','#ff3b00'], water: ['#4a90e2','#8fd3fe','#fff'], wind: ['#5fd35f','#b6ffb6','#fff'], earth: ['#d39a3a','#7a5a26','#e7c089'], none: ['#ffd166','#fff'] };
  const pal = colors[element] || colors.fire;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.background = pal[i % pal.length];
    layer.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 70;
    const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist;
    p.animate([
      { transform: 'translate(-50%,-50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0)`, opacity: 0 }
    ], { duration: 500 + Math.random() * 200, easing: 'cubic-bezier(0.22,1,0.36,1)' });
    setTimeout(() => p.remove(), 720);
  }
}
function spawnDamage(dmg, type) {
  const layer = $('effect-layer');
  const el = document.createElement('div');
  el.className = 'dmg-pop ' + type;
  el.style.left = (44 + Math.random() * 12) + '%';
  el.textContent = dmg;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 900);
}
function spawnHitWord(text, bad) {
  const layer = $('effect-layer');
  const el = document.createElement('div');
  el.className = 'hit-word' + (bad ? ' bad' : '');
  el.textContent = text;
  layer.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}
function enemyHit() {
  const v = $('enemy-visual');
  v.classList.remove('hit'); void v.offsetWidth; v.classList.add('hit');
}
function shakeStage(big) {
  const s = $('center-stage');
  s.classList.remove('shake', 'shake-big'); void s.offsetWidth;
  s.classList.add(big ? 'shake-big' : 'shake');
}
function flashStage() {
  const s = $('center-stage');
  s.classList.remove('flash'); void s.offsetWidth; s.classList.add('flash');
  setTimeout(() => s.classList.remove('flash'), 600);
}
function glowPanel() {
  const p = $('character-panel');
  p.classList.remove('awakening'); void p.offsetWidth; p.classList.add('awakening');
  setTimeout(() => p.classList.remove('awakening'), 600);
}
function updateEnemyHp() {
  const e = state.enemy;
  $('enemy-hp-fill').style.width = (e.currentHp / e.hp * 100) + '%';
  $('enemy-hp-text').textContent = `${e.currentHp} / ${e.hp}`;
}
function setMessage(html) { $('battle-message').innerHTML = html; }

// ============================================================
//   撃破 / 進行
// ============================================================
function onEnemyDefeated() {
  const e = state.enemy;
  $('enemy-visual').classList.add('defeated');
  SOUND.sfx('win');
  setMessage(`<span class="msg-awaken">${e.name}を たおした！${e.gold ? ` +${e.gold}G` : ''}</span>`);
  state.gold += (e.gold || 0);
  if (e.gold) SOUND.sfx('gold');
  META.totalKills++;
  addToSet(META.enemiesSlain, e.id);
  SAVE.saveMeta(META);
  setTimeout(() => {
    if (e.isBoss) { showEndScreen(true); return; }
    state.stageIndex++;
    proceedStage();
  }, 1100);
}

function proceedStage() {
  const stage = STAGE_ORDER[state.stageIndex];
  if (!stage) { showEndScreen(true); return; }
  if (stage.type === 'combat') { showScreen('combat-screen'); startCombat(stage); updateStageLabel(); }
  else if (stage.type === 'reward') showRewardScreen();
  else if (stage.type === 'shop') showShopScreen();
}

function updateStageLabel() {
  const stage = STAGE_ORDER[state.stageIndex];
  $('stage-label').textContent = stage.label || '';
  const combatStages = STAGE_ORDER.filter(s => s.type === 'combat');
  const cleared = STAGE_ORDER.slice(0, state.stageIndex).filter(s => s.type === 'combat').length;
  $('run-progress').textContent = `${cleared}/${combatStages.length}`;
}

// ============================================================
//   レンダリング: 戦闘
// ============================================================
function renderCombat() {
  const e = state.enemy;
  $('enemy-name').textContent = e.name;
  updateEnemyHp();
  const v = $('enemy-visual');
  v.textContent = e.emoji;
  v.className = 'enemy-visual';
  if (e.isBoss) v.classList.add('boss-ring');
  else if (e.element && e.element !== 'all') v.classList.add(e.element + '-ring');

  const aff = $('enemy-affinity');
  aff.innerHTML = '';
  if (e.weakness)   aff.innerHTML += `<span class="affinity-tag weak">${ELEMENT_ICON[e.weakness]}弱点</span>`;
  if (e.resistance) aff.innerHTML += `<span class="affinity-tag resist">${ELEMENT_ICON[e.resistance]}耐性</span>`;
  if (e.immune)     aff.innerHTML += `<span class="affinity-tag immune">${ELEMENT_ICON[e.immune]}無効</span>`;

  // ターン
  const tc = $('turn-counter');
  tc.textContent = `残り ${state.turnsLeft} ターン`;
  tc.classList.toggle('danger', state.turnsLeft <= 1);

  // MP
  const avail = getAvailableMP();
  $('mp-text').textContent = state.queue.length > 0 ? `${avail}/${state.mpMax}` : `${state.mp}/${state.mpMax}`;
  $('mp-fill').style.width = (avail / state.mpMax * 100) + '%';

  // デッキ
  $('draw-count').textContent = state.drawPile.length;
  $('discard-count').textContent = state.discardPile.length;
  $('focus-indicator').classList.toggle('hidden', !state.focusBuff);

  // 手札
  const handArea = $('hand-area');
  handArea.innerHTML = '';
  state.hand.forEach((inst) => {
    const card = CARD_BY_ID[inst.cardId];
    const cost = calcCost(card, state.character);
    const qIdx = state.queue.indexOf(inst.instanceId);
    const inQueue = qIdx >= 0;
    const canAdd = inQueue || cost <= getAvailableMP();
    const el = renderCard(card, { selected: inQueue, queueOrder: inQueue ? qIdx + 1 : null, unaffordable: !canAdd });
    el.dataset.iid = inst.instanceId;
    if (state.executing) el.classList.add('locked');
    else el.addEventListener('click', () => toggleQueue(inst.instanceId));
    handArea.appendChild(el);
  });

  // キュー情報・ボタン
  $('queue-count').textContent = state.queue.length;
  $('queue-cost').textContent = state.mp - getAvailableMP();
  $('execute-btn').disabled = state.queue.length === 0 || state.executing;
  $('end-turn-btn').disabled = state.executing;

  renderCharacterPanel();
}

function renderCard(card, opts = {}) {
  const { selected = false, queueOrder = null, unaffordable = false } = opts;
  const cost = calcCost(card, state.character);
  const power = calcPower(card, state.character, state.focusBuff);
  const primaryEl = card.element[0];
  const wrap = document.createElement('div');
  wrap.className = 'card ' + primaryEl + '-card';
  if (card.rarity === 'rare') wrap.classList.add('rare-card');
  if (card.rarity === 'awaken' || isAwaken(card, state.character)) wrap.classList.add('awaken-card');
  if (unaffordable) wrap.classList.add('unaffordable');
  if (selected) wrap.classList.add('selected');

  const rarityTag = card.rarity === 'rare' ? '<span class="card-rarity-tag rare">レア</span>'
    : card.rarity === 'awaken' ? '<span class="card-rarity-tag awaken">覚醒</span>' : '';
  const orderBadge = (selected && queueOrder) ? `<div class="queue-order">${queueOrder}</div>` : '';
  const costClass = cost === 0 ? 'card-cost-badge free' : 'card-cost-badge';
  const powerHtml = card.special === 'focus'
    ? `<div class="card-power-badge support"><span class="pic">🎯</span><span class="pval">+20</span><span class="plabel">こうか</span></div>`
    : `<div class="card-power-badge"><span class="pic">⚔</span><span class="pval">${card.hits ? `${power}×${card.hits}` : power}</span><span class="plabel">ダメージ</span></div>`;

  wrap.innerHTML = `
    ${rarityTag}${orderBadge}
    <div class="${costClass}"><span class="cval">${cost}</span><span class="clabel">MP</span></div>
    <div class="card-art">${card.emoji}</div>
    <div class="card-name">${card.name}</div>
    <div class="card-desc">${card.desc}</div>
    ${powerHtml}
  `;
  return wrap;
}

function renderCharacterPanel() {
  const c = state.character;
  const sorted = ELEMENT_LIST.slice().sort((a, b) => c.aptitude[b] - c.aptitude[a]);
  const aptRows = sorted.map(el =>
    `<div class="cp-apt-row">${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}<span class="stars">${aptToStars(c.aptitude[el])}</span></div>`
  ).join('');
  const exRows = ELEMENT_LIST.map(el => {
    const v = c.exhaustion[el], ready = v >= 100;
    return `<div class="cp-ex-row ${ready ? 'ready' : ''}"><span class="lbl">${ELEMENT_ICON[el]}</span><div class="cp-ex-bar"><div class="cp-ex-fill" style="width:${v}%"></div></div></div>`;
  }).join('');
  $('character-panel').innerHTML = `
    <div class="cp-head"><span class="cp-emoji">${c.emoji}</span><div><div class="cp-name">${c.name}</div><div class="cp-tap">タップで詳細 ⓘ</div></div></div>
    <div>${aptRows}</div>
    <div class="cp-exhaust"><div style="font-size:10px;color:var(--text-mute);margin-bottom:2px">苦労値（満タンで覚醒）</div>${exRows}</div>
  `;
}

// ============================================================
//   キャラ詳細
// ============================================================
function showCharacterDetail() {
  if (state.executing) return;
  const c = state.character;
  const sorted = ELEMENT_LIST.slice().sort((a, b) => c.aptitude[b] - c.aptitude[a]);
  const rows = sorted.map(el => {
    const apt = c.aptitude[el];
    return `<tr><td>${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}</td><td class="stars">${aptToStars(apt)}</td><td>${apt}</td><td>×${(100/apt).toFixed(2)}</td></tr>`;
  }).join('');
  const exRows = ELEMENT_LIST.map(el => {
    const v = c.exhaustion[el], ready = v >= 100;
    return `<div class="exhaust-detail-row ${ready ? 'ready' : ''}"><span>${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}</span><div class="exhaust-mini-bar"><div class="exhaust-mini-fill" style="width:${v}%"></div></div><span style="font-size:11px;color:var(--text-mute);min-width:46px;text-align:right">${ready ? '覚醒!' : v + '/100'}</span></div>`;
  }).join('');
  $('detail-body').innerHTML = `
    <h3 style="font-size:20px;margin-bottom:4px">${c.emoji} ${c.name}</h3>
    <p style="color:var(--text-dim);font-size:13px;margin-bottom:12px">${c.desc}</p>
    <table class="detail-table"><tr><th>属性</th><th>適性</th><th>数値</th><th>コスト倍率</th></tr>${rows}</table>
    <div class="exhaust-detail"><h4>苦労値</h4>${exRows}</div>
  `;
  $('detail-panel').classList.remove('hidden');
}

// ============================================================
//   キャラ選択
// ============================================================
function showCharacterSelect() {
  SOUND.init(); SOUND.sfx('select');
  showScreen('character-select-screen');
  const choices = shuffle(CHARACTER_POOL).slice(0, 3);
  const wrap = $('character-choices');
  wrap.innerHTML = '';
  choices.forEach(c => {
    const sorted = ELEMENT_LIST.slice().sort((a, b) => c.aptitude[b] - c.aptitude[a]);
    const rows = sorted.map(el =>
      `<div class="aptitude-row apt-${el}"><span class="aptitude-label">${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}</span><span><span class="aptitude-stars">${aptToStars(c.aptitude[el])}</span><span class="aptitude-num">${c.aptitude[el]}</span></span></div>`
    ).join('');
    const card = document.createElement('div');
    card.className = 'choice-character';
    card.innerHTML = `<div class="char-emoji">${c.emoji}</div><div class="char-name">${c.name}</div><div class="char-desc">${c.desc}</div>${rows}`;
    card.addEventListener('click', () => { SOUND.sfx('none'); selectCharacter(c); });
    wrap.appendChild(card);
  });
}
function selectCharacter(t) {
  state.character = { ...t, aptitude: { ...t.aptitude }, exhaustion: { fire: 0, water: 0, wind: 0, earth: 0 } };
  state.deck = STARTER_DECK_IDS.slice();
  state.gold = 0;
  state.stageIndex = 0;
  META.plays++;
  addToSet(META.charsSeen, t.id);
  STARTER_DECK_IDS.forEach(id => addToSet(META.cardsFound, id));
  SAVE.saveMeta(META);
  proceedStage();
}

// ============================================================
//   報酬
// ============================================================
function showRewardScreen() {
  showScreen('reward-screen');
  SOUND.sfx('select');
  const isLate = state.stageIndex >= 6;
  const choices = [];
  const used = new Set();
  let guard = 0;
  while (choices.length < 3 && guard++ < 100) {
    const wantRare = Math.random() < (isLate ? 0.4 : 0.15);
    const sub = CARDS.filter(c => !c.awakenOnly && (wantRare ? c.rarity === 'rare' : c.rarity === 'normal'));
    const cand = sub[Math.floor(Math.random() * sub.length)];
    if (!cand || used.has(cand.id)) continue;
    used.add(cand.id); choices.push(cand);
  }
  const wrap = $('reward-choices');
  wrap.innerHTML = '';
  choices.forEach(c => {
    const card = renderCard(c);
    card.classList.remove('unaffordable');
    card.addEventListener('click', () => { SOUND.sfx('gold'); state.deck.push(c.id); recordCardsFound([c.id]); state.stageIndex++; proceedStage(); });
    wrap.appendChild(card);
  });
  saveRun('reward');
}

// ============================================================
//   ショップ
// ============================================================
function showShopScreen() {
  showScreen('shop-screen');
  SOUND.sfx('select');
  $('shop-gold').textContent = state.gold;
  $('remove-list').classList.add('hidden');
  const normalPool = CARDS.filter(c => !c.awakenOnly && c.rarity !== 'awaken');
  const awakenPool = CARDS.filter(c => c.awakenOnly);
  const items = [];
  const used = new Set();
  let guard = 0;
  while (items.length < 3 && guard++ < 100) {
    const c = normalPool[Math.floor(Math.random() * normalPool.length)];
    if (used.has(c.id)) continue;
    used.add(c.id);
    items.push({ card: c, price: c.rarity === 'rare' ? 35 : 20 });
  }
  items.push({ card: awakenPool[Math.floor(Math.random() * awakenPool.length)], price: 50 });

  const wrap = $('shop-items');
  wrap.innerHTML = '';
  items.forEach(item => {
    const card = renderCard(item.card);
    card.classList.remove('unaffordable');
    card.classList.add('shop-item');
    if (state.gold < item.price) card.classList.add('disabled');
    const price = document.createElement('div');
    price.className = 'shop-price';
    price.textContent = `${item.price}G`;
    card.appendChild(price);
    card.addEventListener('click', () => {
      if (state.gold < item.price || card.classList.contains('bought')) { SOUND.sfx('error'); return; }
      state.gold -= item.price;
      state.deck.push(item.card.id);
      recordCardsFound([item.card.id]);
      card.classList.add('bought');
      SOUND.sfx('gold');
      $('shop-gold').textContent = state.gold;
      saveRun('shop');
      // 買えなくなった他カードを暗く
      document.querySelectorAll('#shop-items .shop-item:not(.bought)').forEach(el => {
        const p = parseInt(el.querySelector('.shop-price').textContent);
        el.classList.toggle('disabled', state.gold < p);
      });
    });
    wrap.appendChild(card);
  });
  saveRun('shop');
}
function showRemoveList() {
  const list = $('remove-list');
  list.classList.remove('hidden');
  const wrap = $('remove-cards');
  wrap.innerHTML = '';
  state.deck.forEach((cardId, idx) => {
    const el = renderCard(CARD_BY_ID[cardId]);
    el.classList.remove('unaffordable');
    el.addEventListener('click', () => {
      state.gold -= 30;
      state.deck.splice(idx, 1);
      SOUND.sfx('gold');
      $('shop-gold').textContent = state.gold;
      list.classList.add('hidden');
      saveRun('shop');
    });
    wrap.appendChild(el);
  });
}

// ============================================================
//   終了画面
// ============================================================
function showEndScreen(win) {
  showScreen('end-screen');
  const t = $('end-title');
  t.textContent = win ? 'VICTORY' : 'GAME OVER';
  t.classList.toggle('lose', !win);
  const stage = STAGE_ORDER[state.stageIndex];
  $('end-message').innerHTML = win
    ? `${state.character.name}は 四元キメラを 討伐した！<br>所持G ${state.gold} ／ デッキ ${state.deck.length}枚`
    : `${state.enemy ? state.enemy.name : '敵'}を たおせなかった…<br>到達 Stage ${stage ? stage.label : '?'} ／ 所持G ${state.gold}`;
  // 記録を更新し、ランは破棄（ローグライク）
  if (win) { META.wins++; META.bestStageIdx = STAGE_ORDER.length; META.bestStageLabel = 'クリア'; }
  else if (state.stageIndex > META.bestStageIdx) { META.bestStageIdx = state.stageIndex; META.bestStageLabel = stage ? stage.label : '—'; }
  SAVE.saveMeta(META);
  SAVE.clearRun();
  renderTitleStats();
  SOUND.sfx(win ? 'win' : 'lose');
  if (win) spawnConfetti();
}
function spawnConfetti() {
  const layer = $('confetti-layer');
  layer.innerHTML = '';
  const colors = ['#ff6b35','#ffd166','#4a90e2','#5fd35f','#e94560','#fff'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    c.style.animationDelay = (Math.random() * 1.5) + 's';
    layer.appendChild(c);
  }
  setTimeout(() => { layer.innerHTML = ''; }, 5000);
}

// ============================================================
//   記録・図鑑
// ============================================================
function renderTitleStats() {
  const m = META;
  const el = $('title-stats');
  if (el) {
    el.innerHTML = m.plays === 0
      ? '<span class="ts-empty">まだ冒険の記録がありません</span>'
      : `<span>🎮 ${m.plays}回</span><span>🏆 ${m.wins}勝</span><span>📍 最高 ${m.bestStageLabel}</span>`;
  }
  const cont = $('continue-btn');
  if (cont) cont.style.display = SAVE.hasRun() ? '' : 'none';
}

function showRecords() {
  SOUND.sfx('select');
  renderRecords();
  $('records-panel').classList.remove('hidden');
}

function renderRecords() {
  const m = META;
  const winRate = m.plays > 0 ? Math.round(m.wins / m.plays * 100) : 0;
  const stat = (icon, label, val) => `<div class="rec-stat"><div class="rec-stat-val">${val}</div><div class="rec-stat-lbl">${icon} ${label}</div></div>`;
  const statsHtml = `<div class="rec-stats">
    ${stat('🎮','プレイ', m.plays)}${stat('🏆','勝利', m.wins)}${stat('📈','勝率', winRate + '%')}
    ${stat('📍','最高到達', m.bestStageLabel)}${stat('⚔','撃破', m.totalKills)}
    ${stat('✨','覚醒', m.totalAwakenings)}${stat('🔥','最大コンボ', m.maxCombo)}
  </div>`;

  const cell = (seen, emoji, name, extra = '') =>
    `<div class="zukan-cell ${seen ? '' : 'locked'} ${extra}">` +
    (seen ? `<div class="zk-emoji">${emoji}</div><div class="zk-name">${name}</div>`
          : `<div class="zk-emoji">❓</div><div class="zk-name">？？？</div>`) + '</div>';

  const charHtml  = CHARACTER_POOL.map(c => cell(m.charsSeen.includes(c.id), c.emoji, c.name)).join('');
  const enemyHtml = Object.entries(ENEMIES).map(([id, e]) => cell(m.enemiesSlain.includes(id), e.emoji, e.name)).join('');
  const cardHtml  = CARDS.map(c => cell(m.cardsFound.includes(c.id), c.emoji, c.name, c.element[0] + '-card')).join('');

  $('records-body').innerHTML = `
    <h3 class="rec-title">📖 きろく・ずかん</h3>
    ${statsHtml}
    <h4 class="zukan-head">仲間 <span>${m.charsSeen.length}/${CHARACTER_POOL.length}</span></h4>
    <div class="zukan-grid">${charHtml}</div>
    <h4 class="zukan-head">モンスター <span>${m.enemiesSlain.length}/${Object.keys(ENEMIES).length}</span></h4>
    <div class="zukan-grid">${enemyHtml}</div>
    <h4 class="zukan-head">カード <span>${m.cardsFound.length}/${CARDS.length}</span></h4>
    <div class="zukan-grid">${cardHtml}</div>
    <button id="reset-records-btn" class="secondary-btn reset-btn">記録をすべて消す</button>
  `;
  $('reset-records-btn').addEventListener('click', () => {
    if (confirm('すべての記録・図鑑・冒険データを消します。よろしいですか？')) {
      SAVE.resetAll();
      META = SAVE.loadMeta();
      renderRecords();
      renderTitleStats();
      SOUND.sfx('error');
    }
  });
}

// ============================================================
//   画面切替・初期化
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  updateMuteButtons();
  renderTitleStats();
  $('start-btn').addEventListener('click', () => { SOUND.init(); showCharacterSelect(); });
  $('continue-btn').addEventListener('click', resumeRun);
  $('records-btn').addEventListener('click', showRecords);
  $('close-records').addEventListener('click', () => $('records-panel').classList.add('hidden'));
  $('records-panel').addEventListener('click', (e) => { if (e.target.id === 'records-panel') $('records-panel').classList.add('hidden'); });
  $('restart-btn').addEventListener('click', () => { showScreen('title-screen'); renderTitleStats(); });
  $('end-turn-btn').addEventListener('click', endTurn);
  $('execute-btn').addEventListener('click', executeQueue);
  $('character-panel').addEventListener('click', showCharacterDetail);
  $('close-detail').addEventListener('click', () => $('detail-panel').classList.add('hidden'));
  $('detail-panel').addEventListener('click', (e) => { if (e.target.id === 'detail-panel') $('detail-panel').classList.add('hidden'); });
  $('mute-btn').addEventListener('click', () => SOUND.toggle());
  $('mute-btn-title').addEventListener('click', () => { SOUND.init(); SOUND.toggle(); });
  $('skip-reward-btn').addEventListener('click', () => { state.stageIndex++; proceedStage(); });
  $('leave-shop-btn').addEventListener('click', () => { state.stageIndex++; proceedStage(); });
  $('remove-card-btn').addEventListener('click', () => {
    if (state.gold < 30) { SOUND.sfx('error'); return; }
    if (state.deck.length <= 4) { SOUND.sfx('error'); return; }
    showRemoveList();
  });
  $('cancel-remove-btn').addEventListener('click', () => $('remove-list').classList.add('hidden'));
});
