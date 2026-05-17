/* ============================================================
   APTITUDE — v0.1
   ローグライク / デッキビルダー
   ============================================================ */

// ---------- 定数 ----------
const ELEMENT_ICON = { fire: '🔥', water: '💧', wind: '💨', earth: '🪨', none: '✦' };
const ELEMENT_NAME = { fire: '火',  water: '水',  wind: '風',  earth: '土',  none: '無' };
const ELEMENT_LIST = ['fire', 'water', 'wind', 'earth'];

// ---------- キャラクター ----------
const CHARACTER_POOL = [
  {
    id: 'rio',
    name: '炎使いリオ',
    emoji: '🔥',
    desc: '炎を操る達人。爆発的火力で勝負を決める',
    aptitude: { fire: 92, wind: 58, earth: 31, water: 12 },
  },
  {
    id: 'kai',
    name: '風読みカイ',
    emoji: '💨',
    desc: '風を読む俊敏な戦士。手数で押し切る',
    aptitude: { wind: 88, earth: 61, water: 35, fire: 15 },
  },
  {
    id: 'mizuha',
    name: '水巫女ミズハ',
    emoji: '💧',
    desc: '水を司る巫女。安定して敵を浸食する',
    aptitude: { water: 90, earth: 55, wind: 33, fire: 18 },
  },
  {
    id: 'gounaga',
    name: '岩石ゴウナガ',
    emoji: '🪨',
    desc: '岩盤の戦士。重く硬い一撃を放つ',
    aptitude: { earth: 89, fire: 56, water: 32, wind: 14 },
  },
  {
    id: 'sayuri',
    name: '霧雨サユリ',
    emoji: '🌀',
    desc: '風と水を併せ持つ機動型。複合カードに強い',
    aptitude: { wind: 76, water: 70, fire: 28, earth: 16 },
  },
];

// ---------- カード ----------
const CARDS = [
  // === 火 ===
  { id: 'fireball',    name: '火球',     element: ['fire'],  baseCost: 5,  basePower: 20, rarity: 'normal', desc: '単体攻撃' },
  { id: 'great_fire',  name: '大火炎',   element: ['fire'],  baseCost: 12, basePower: 50, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'flame_dance', name: '炎舞',     element: ['fire'],  baseCost: 7,  basePower: 18, hits: 2, rarity: 'normal', desc: '2回攻撃' },
  // === 水 ===
  { id: 'water_bullet', name: '水弾',    element: ['water'], baseCost: 5,  basePower: 20, rarity: 'normal', desc: '単体攻撃' },
  { id: 'tsunami',      name: '津波',    element: ['water'], baseCost: 12, basePower: 50, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'rain_arrow',   name: '雨矢',    element: ['water'], baseCost: 7,  basePower: 17, hits: 2, rarity: 'normal', desc: '2回攻撃' },
  // === 風 ===
  { id: 'wind_blade',   name: '風刃',    element: ['wind'],  baseCost: 6,  basePower: 20, rarity: 'normal', desc: '単体攻撃' },
  { id: 'twin_blade',   name: '連風刃',  element: ['wind'],  baseCost: 8,  basePower: 25, hits: 2, rarity: 'normal', desc: '2回攻撃' },
  { id: 'gale',         name: '疾風',    element: ['wind'],  baseCost: 10, basePower: 42, rarity: 'normal', desc: '高威力攻撃' },
  // === 土 ===
  { id: 'rock_throw',   name: '岩投げ',  element: ['earth'], baseCost: 8,  basePower: 25, rarity: 'normal', desc: '単体攻撃' },
  { id: 'rock_fall',    name: '岩盤崩落',element: ['earth'], baseCost: 14, basePower: 55, rarity: 'normal', desc: '高威力攻撃' },
  { id: 'sand_burst',   name: '砂礫弾',  element: ['earth'], baseCost: 6,  basePower: 18, rarity: 'normal', desc: '単体攻撃' },
  // === 無属性 ===
  { id: 'focus',        name: '集中',    element: ['none'],  baseCost: 3,  basePower: 0,  rarity: 'normal', desc: '次の攻撃の威力+20', special: 'focus' },
  // === レア（2属性複合）===
  { id: 'steam_blast',  name: '蒸気爆発', element: ['fire','water'], costElement: 'water', powerElement: 'fire', baseCost: 10, basePower: 60, rarity: 'rare', desc: '火×水: 水でコスト・火で威力' },
  { id: 'storm_blade',  name: '嵐の刃',   element: ['wind','water'], costElement: 'wind',  powerElement: 'water',baseCost: 10, basePower: 60, rarity: 'rare', desc: '風×水: 風でコスト・水で威力' },
  { id: 'magma_strike', name: 'マグマ撃', element: ['fire','earth'], costElement: 'earth', powerElement: 'fire', baseCost: 10, basePower: 60, rarity: 'rare', desc: '火×土: 土でコスト・火で威力' },
  { id: 'wind_quake',   name: '風震',     element: ['wind','earth'], costElement: 'earth', powerElement: 'wind', baseCost: 10, basePower: 60, rarity: 'rare', desc: '風×土: 土でコスト・風で威力' },
  { id: 'tidal_quake',  name: '津波震',   element: ['water','earth'],costElement: 'earth', powerElement: 'water',baseCost: 10, basePower: 60, rarity: 'rare', desc: '水×土: 土でコスト・水で威力' },
  { id: 'cinder_gust',  name: '火種旋風', element: ['fire','wind'],  costElement: 'wind',  powerElement: 'fire', baseCost: 10, basePower: 60, rarity: 'rare', desc: '火×風: 風でコスト・火で威力' },
  // === 覚醒専用 ===
  { id: 'limit_break_fire',  name: '限界超越', element: ['fire'],  baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ手札に出現' },
  { id: 'limit_break_water', name: '深淵解放', element: ['water'], baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ手札に出現' },
  { id: 'limit_break_wind',  name: '颶風一閃', element: ['wind'],  baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ手札に出現' },
  { id: 'limit_break_earth', name: '大地震撼', element: ['earth'], baseCost: 0, basePower: 90, rarity: 'awaken', awakenOnly: true, desc: '覚醒時のみ手札に出現' },
];

const CARD_BY_ID = Object.fromEntries(CARDS.map(c => [c.id, c]));

// ---------- 敵 ----------
const ENEMIES = {
  water_slime:  { name: '水スライム', emoji: '🟦', hp: 60,  weakness: 'fire',  resistance: 'wind',  element: 'water', gold: 6  },
  wind_sprite:  { name: '風の精霊',   emoji: '🦋', hp: 70,  weakness: 'earth', resistance: 'fire',  element: 'wind',  gold: 7  },
  earth_pebble: { name: '小石ゴーレム',emoji: '🟫', hp: 90,  weakness: 'water', resistance: 'earth', element: 'earth', gold: 7  },
  fire_imp:     { name: '火の小鬼',   emoji: '👺', hp: 110, weakness: 'water', resistance: 'wind',  element: 'fire',  gold: 9  },
  water_serpent:{ name: '水大蛇',     emoji: '🐍', hp: 130, weakness: 'wind',  resistance: 'water', element: 'water', gold: 10 },
  thunder_kite: { name: '雷鳥',       emoji: '🦅', hp: 140, weakness: 'earth', resistance: 'wind',  element: 'wind',  gold: 10 },
  boss_chimera: { name: '四元キメラ', emoji: '👹', hp: 320, weakness: 'wind',  resistance: 'fire',  element: 'all',   gold: 0, isBoss: true },
};

// ---------- ステージ進行 ----------
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

// ---------- スタートデッキ ----------
const STARTER_DECK_IDS = [
  'fireball', 'fireball',
  'water_bullet', 'water_bullet',
  'wind_blade', 'wind_blade',
  'rock_throw', 'focus',
];

// ============================================================
//   状態
// ============================================================
const state = {
  character: null,
  deck: [],
  drawPile: [],         // cardId の配列
  discardPile: [],      // cardId の配列
  hand: [],             // { instanceId, cardId } の配列
  queue: [],            // 選択した instanceId の配列（発動順）
  executing: false,     // 発動中フラグ（UI ロック）
  mp: 40,
  mpMax: 40,
  focusBuff: false,
  enemy: null,
  enemyMaxHp: 0,
  stageIndex: 0,
  gold: 0,
  turnsLeft: 0,
  maxTurns: 0,
  shopState: null,
};

let _nextInstanceId = 1;
function mkInstance(cardId) {
  return { instanceId: _nextInstanceId++, cardId };
}
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ============================================================
//   ロジック関数
// ============================================================

// ★ 1〜5 表示
function aptToStars(apt) {
  // 0-19 = ★1, 20-39 = ★2, 40-59 = ★3, 60-79 = ★4, 80-100 = ★5
  if (apt >= 80) return '★★★★★';
  if (apt >= 60) return '★★★★';
  if (apt >= 40) return '★★★';
  if (apt >= 20) return '★★';
  return '★';
}

// 実コスト
function calcCost(card, character) {
  // 無属性: 適性影響なし
  if (card.element.length === 1 && card.element[0] === 'none') return card.baseCost;
  // 覚醒中: コスト0
  if (isAwaken(card, character)) return 0;
  const costEl = card.costElement || card.element[0];
  const apt = character.aptitude[costEl];
  return Math.max(1, Math.round(card.baseCost * (100 / apt)));
}

// 実威力（弱点倍率は別途）
function calcPower(card, character, withFocus) {
  const powerEl = card.powerElement || card.element[0];
  let basePower = card.basePower;
  if (withFocus) basePower += 20;
  let power;
  if (powerEl === 'none' || powerEl === undefined) {
    power = basePower;
  } else {
    const apt = character.aptitude[powerEl];
    power = Math.round(basePower * (apt / 100));
  }
  // 覚醒中: 威力3倍
  if (isAwaken(card, character)) power *= 3;
  return power;
}

// 該当カードが覚醒適用対象か
function isAwaken(card, character) {
  if (card.element.length === 1 && card.element[0] === 'none') return false;
  const el = card.element[0]; // 主属性で判定
  return character.exhaustion[el] >= 100;
}

// 弱点・耐性倍率
function elementMultiplier(card, enemy) {
  if (!enemy) return 1;
  const el = card.element[0];
  if (el === 'none') return 1;
  if (enemy.immune === el) return 0;
  if (enemy.weakness === el) return 2.5;
  if (enemy.resistance === el) return 0.25;
  return 1;
}

// ============================================================
//   デッキ操作
// ============================================================
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startCombat(stage) {
  const e = ENEMIES[stage.enemyId];
  state.enemy = { ...e, currentHp: e.hp };
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
  log(`<span class="system">— ${e.name} が現れた！（${stage.turns}ターン以内に撃破せよ）—</span>`);
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
    // 覚醒専用カード: 該当属性が覚醒中でなければスキップ
    if (card.awakenOnly) {
      const el = card.element[0];
      if (state.character.exhaustion[el] < 100) {
        skipped.push(cardId);
        continue;
      }
    }
    state.hand.push(mkInstance(cardId));
  }
  // スキップしたカードはターン後の捨て山へ（同一サイクル内で再評価されないように）
  state.discardPile.push(...skipped);
}

function endTurn() {
  if (state.executing) return;
  state.discardPile.push(...state.hand.map(h => h.cardId));
  state.hand = [];
  state.queue = [];
  state.mp = state.mpMax;
  state.focusBuff = false;
  state.turnsLeft--;
  if (state.turnsLeft <= 0) {
    log('<span class="awaken">— ターンが尽きた… —</span>');
    setTimeout(() => showEndScreen(false), 700);
    return;
  }
  log(`<span class="system">— ターン終了（残り ${state.turnsLeft} ターン）—</span>`);
  drawHand();
  renderCombat();
}

// ============================================================
//   選択キュー
// ============================================================
function getAvailableMP() {
  return state.mp - state.queue.reduce((sum, id) => {
    const inst = state.hand.find(h => h.instanceId === id);
    if (!inst) return sum;
    const c = CARD_BY_ID[inst.cardId];
    return sum + calcCost(c, state.character);
  }, 0);
}

function toggleQueue(instanceId) {
  if (state.executing) return;
  const pos = state.queue.indexOf(instanceId);
  if (pos >= 0) {
    state.queue.splice(pos, 1);
  } else {
    const inst = state.hand.find(h => h.instanceId === instanceId);
    if (!inst) return;
    const card = CARD_BY_ID[inst.cardId];
    const cost = calcCost(card, state.character);
    if (cost > getAvailableMP()) return;
    state.queue.push(instanceId);
  }
  renderCombat();
}

function clearQueue() {
  if (state.executing) return;
  state.queue = [];
  renderCombat();
}

// ============================================================
//   発動（カード使用）
// ============================================================
async function executeQueue() {
  if (state.executing || state.queue.length === 0) return;
  state.executing = true;
  const ids = state.queue.slice();
  state.queue = [];
  renderCombat();

  for (let i = 0; i < ids.length; i++) {
    const instId = ids[i];
    const inst = state.hand.find(h => h.instanceId === instId);
    if (!inst) continue;
    const cardId = inst.cardId;
    // 手札から取り除く
    state.hand = state.hand.filter(h => h.instanceId !== instId);
    await playCardEffect(cardId, i + 1, ids.length);
    renderCombat();
    if (state.enemy.currentHp <= 0) break;
    await sleep(ids.length > 1 ? 360 : 0);
  }

  state.executing = false;
  if (state.enemy.currentHp <= 0) {
    onEnemyDefeated();
  } else {
    renderCombat();
  }
}

async function playCardEffect(cardId, comboIdx, comboTotal) {
  const card = CARD_BY_ID[cardId];
  // 発動時点での状態で再計算（覚醒連鎖を考慮）
  const wasAwaken = isAwaken(card, state.character);
  const cost = calcCost(card, state.character);
  state.mp = Math.max(0, state.mp - cost);
  state.discardPile.push(cardId);

  if (comboTotal >= 2) showCombo(comboIdx);

  if (card.special === 'focus') {
    state.focusBuff = true;
    log(`<span class="system">${state.character.name} は集中した（次撃+20）</span>`);
    return;
  }

  const hits = card.hits || 1;
  const useFocus = state.focusBuff;
  let totalDmg = 0;
  for (let i = 0; i < hits; i++) {
    let dmg = calcPower(card, state.character, useFocus);
    const mult = elementMultiplier(card, state.enemy);
    dmg = Math.round(dmg * mult);
    applyDamage(dmg, mult, wasAwaken);
    totalDmg += dmg;
    if (i < hits - 1) await sleep(130);
  }
  if (useFocus) state.focusBuff = false;

  const tag = wasAwaken ? ' <span class="awaken">⚡覚醒</span>' : '';
  log(`<span><strong>${card.name}</strong> → <span class="dmg">${totalDmg}</span>${tag}</span>`);

  // 苦労値の更新 / 覚醒消費
  if (card.element[0] !== 'none') {
    const el = card.element[0];
    if (wasAwaken) {
      state.character.exhaustion[el] = 0;
    } else {
      const add = Math.max(0, 100 - state.character.aptitude[el]);
      state.character.exhaustion[el] = Math.min(100, state.character.exhaustion[el] + add);
      if (state.character.exhaustion[el] >= 100) {
        log(`<span class="awaken">✨ ${ELEMENT_NAME[el]}属性が覚醒状態に！</span>`);
      }
    }
  }
}

function showCombo(idx) {
  const wrap = document.getElementById('floating-damage');
  const el = document.createElement('div');
  el.className = 'combo-popup';
  el.textContent = `COMBO ×${idx}`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function applyDamage(dmg, mult, wasAwaken) {
  state.enemy.currentHp = Math.max(0, state.enemy.currentHp - dmg);
  // フローティングダメージ
  const popClass = wasAwaken ? 'crit' : (mult >= 2 ? 'weak' : (mult <= 0.5 ? 'resist' : ''));
  popDamage(dmg, popClass);
  // 敵シェイク
  const vis = document.getElementById('enemy-visual');
  vis.classList.remove('hit');
  void vis.offsetWidth;
  vis.classList.add('hit');
}

function popDamage(dmg, popClass) {
  const wrap = document.getElementById('floating-damage');
  const el = document.createElement('div');
  el.className = 'dmg-pop ' + popClass;
  el.textContent = dmg;
  // 敵ビジュアル付近にランダム配置
  el.style.left = (8 + Math.random() * 10) + '%';
  el.style.top = (20 + Math.random() * 30) + 'px';
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function log(html) {
  const el = document.getElementById('play-log');
  const e = document.createElement('div');
  e.className = 'entry';
  e.innerHTML = html;
  el.appendChild(e);
  el.scrollTop = el.scrollHeight;
}

// ============================================================
//   敵撃破 / ステージ進行
// ============================================================
function onEnemyDefeated() {
  const e = state.enemy;
  log(`<span class="heal">— ${e.name} を撃破！ +${e.gold || 0}G —</span>`);
  state.gold += (e.gold || 0);
  state.enemy.currentHp = 0;
  renderCombat();

  setTimeout(() => {
    if (e.isBoss) {
      showEndScreen(true);
      return;
    }
    state.stageIndex++;
    proceedStage();
  }, 900);
}

function proceedStage() {
  const stage = STAGE_ORDER[state.stageIndex];
  if (!stage) {
    showEndScreen(true);
    return;
  }
  if (stage.type === 'combat') {
    showScreen('combat-screen');
    startCombat(stage);
    updateStageLabel();
  } else if (stage.type === 'reward') {
    showRewardScreen();
  } else if (stage.type === 'shop') {
    showShopScreen();
  }
}

function updateStageLabel() {
  const stage = STAGE_ORDER[state.stageIndex];
  document.getElementById('stage-label').textContent = 'Stage ' + (stage.label || '');
  // progress
  const combatStages = STAGE_ORDER.filter(s => s.type === 'combat');
  const cleared = STAGE_ORDER.slice(0, state.stageIndex).filter(s => s.type === 'combat').length;
  document.getElementById('run-progress').textContent = `${cleared}/${combatStages.length} 撃破`;
}

// ============================================================
//   レンダリング: 戦闘画面
// ============================================================
function renderCombat() {
  // 敵
  const e = state.enemy;
  document.getElementById('enemy-name').textContent = e.name;
  document.getElementById('enemy-hp-text').textContent = `${e.currentHp} / ${e.hp}`;
  document.getElementById('enemy-hp-fill').style.width = (e.currentHp / e.hp * 100) + '%';
  const visEl = document.getElementById('enemy-visual');
  visEl.textContent = e.emoji;
  visEl.className = 'enemy-visual';
  if (e.isBoss) visEl.classList.add('boss-ring');
  else if (e.element && e.element !== 'all') visEl.classList.add(e.element + '-ring');

  // 弱点/耐性
  const aff = document.getElementById('enemy-affinity');
  aff.innerHTML = '';
  if (e.weakness) aff.innerHTML += `<span class="affinity-tag weak">${ELEMENT_ICON[e.weakness]} 弱点 ${ELEMENT_NAME[e.weakness]}</span>`;
  if (e.resistance) aff.innerHTML += `<span class="affinity-tag resist">${ELEMENT_ICON[e.resistance]} 耐性 ${ELEMENT_NAME[e.resistance]}</span>`;
  if (e.immune) aff.innerHTML += `<span class="affinity-tag immune">${ELEMENT_ICON[e.immune]} 無効 ${ELEMENT_NAME[e.immune]}</span>`;

  // ターンカウンタ
  const tc = document.getElementById('turn-counter');
  tc.textContent = `残り ${state.turnsLeft} / ${state.maxTurns} ターン`;
  tc.classList.toggle('danger', state.turnsLeft <= 1);

  // MP（キュー消費を考慮した実効MP表示）
  const usedByQueue = state.mp - getAvailableMP();
  const availableMP = getAvailableMP();
  document.getElementById('mp-text').textContent = state.queue.length > 0
    ? `${availableMP} (-${usedByQueue}) / ${state.mpMax}`
    : `${state.mp} / ${state.mpMax}`;
  document.getElementById('mp-fill').style.width = (availableMP / state.mpMax * 100) + '%';

  // デッキ
  document.getElementById('draw-count').textContent = state.drawPile.length;
  document.getElementById('discard-count').textContent = state.discardPile.length;
  const fi = document.getElementById('focus-indicator');
  fi.classList.toggle('hidden', !state.focusBuff);

  // 手札
  const handArea = document.getElementById('hand-area');
  handArea.innerHTML = '';
  state.hand.forEach((inst) => {
    const card = CARD_BY_ID[inst.cardId];
    const cost = calcCost(card, state.character);
    const queueIdx = state.queue.indexOf(inst.instanceId);
    const inQueue = queueIdx >= 0;
    const canAdd = inQueue || cost <= getAvailableMP();
    const el = renderCard(card, {
      selected: inQueue,
      queueOrder: inQueue ? queueIdx + 1 : null,
      unaffordable: !canAdd,
    });
    if (state.executing) el.classList.add('locked');
    else el.addEventListener('click', () => toggleQueue(inst.instanceId));
    handArea.appendChild(el);
  });

  // キューバー
  const queueCount = document.getElementById('queue-count');
  const queueCost = document.getElementById('queue-cost');
  if (queueCount && queueCost) {
    queueCount.textContent = state.queue.length;
    queueCost.textContent = state.mp - getAvailableMP();
  }
  const execBtn = document.getElementById('execute-btn');
  if (execBtn) execBtn.disabled = state.queue.length === 0 || state.executing;
  const clearBtn = document.getElementById('clear-btn');
  if (clearBtn) clearBtn.disabled = state.queue.length === 0 || state.executing;
  const endBtn = document.getElementById('end-turn-btn');
  if (endBtn) endBtn.disabled = state.executing;

  // キャラ
  renderCharacterPanel();
}

function renderCard(card, opts = {}) {
  const { selected = false, queueOrder = null, unaffordable = false } = opts;
  const cost = calcCost(card, state.character);
  const power = calcPower(card, state.character, state.focusBuff);
  const wrap = document.createElement('div');
  const primaryEl = card.element[0];
  wrap.className = 'card ' + primaryEl + '-card';
  if (card.rarity === 'rare') wrap.classList.add('rare-card');
  if (card.rarity === 'awaken' || isAwaken(card, state.character)) wrap.classList.add('awaken-card');
  if (unaffordable) wrap.classList.add('unaffordable');
  if (selected) wrap.classList.add('selected');

  // 要素表示（複合は2つ）
  const icons = card.element.map(e => ELEMENT_ICON[e] || '').join('');

  const rarityTag = card.rarity === 'rare'
    ? '<span class="card-rarity-tag rare">RARE</span>'
    : card.rarity === 'awaken'
      ? '<span class="card-rarity-tag awaken">AWAKEN</span>'
      : '';

  const dmgLabel = card.special === 'focus' ? '—' :
    (card.hits ? `${power}×${card.hits}` : power);

  const orderBadge = (selected && queueOrder)
    ? `<div class="queue-order">${queueOrder}</div>`
    : '';

  wrap.innerHTML = `
    ${rarityTag}
    ${orderBadge}
    <div class="card-element">${icons}</div>
    <div class="card-name">${card.name}</div>
    <div class="card-stats">
      <span class="card-cost">${cost} MP</span>
      <span class="card-power">${dmgLabel}</span>
    </div>
    <div class="card-desc">${card.desc}</div>
  `;
  return wrap;
}

function renderCharacterPanel() {
  const c = state.character;
  const panel = document.getElementById('character-panel');
  const exhaustPills = ELEMENT_LIST.map(el => {
    const v = c.exhaustion[el];
    const ready = v >= 100;
    return `<span class="exhaust-pill ${ready ? 'ready' : ''}">${ELEMENT_ICON[el]} ${ready ? '覚醒!' : v}</span>`;
  }).join('');
  panel.innerHTML = `
    <div class="char-summary-emoji">${c.emoji}</div>
    <div>
      <div class="char-summary-name">${c.name}</div>
      <div class="char-summary-quick">タップで詳細</div>
      <div class="exhaust-bars">${exhaustPills}</div>
    </div>
  `;
}

// ============================================================
//   キャラクター詳細パネル
// ============================================================
function showCharacterDetail() {
  const c = state.character;
  const sorted = ELEMENT_LIST.slice().sort((a,b) => c.aptitude[b] - c.aptitude[a]);
  const rows = sorted.map(el => {
    const apt = c.aptitude[el];
    const stars = aptToStars(apt);
    const mul = (100 / apt).toFixed(2);
    return `<tr>
      <td>${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}</td>
      <td><span class="aptitude-stars">${stars}</span></td>
      <td><span class="aptitude-num">${apt}</span></td>
      <td><span class="aptitude-num">×${mul}</span></td>
    </tr>`;
  }).join('');

  const exhaustRows = ELEMENT_LIST.map(el => {
    const v = c.exhaustion[el];
    const ready = v >= 100;
    return `<div class="exhaust-detail-row ${ready ? 'ready' : ''}">
      <span>${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}</span>
      <div class="exhaust-mini-bar"><div class="exhaust-mini-fill" style="width:${v}%"></div></div>
      <span style="font-size:11px;color:var(--text-mute);min-width:40px;text-align:right">${ready ? '覚醒!' : v + '/100'}</span>
    </div>`;
  }).join('');

  document.getElementById('detail-body').innerHTML = `
    <h3 style="font-size:20px;margin-bottom:6px">${c.emoji} ${c.name}</h3>
    <p style="color:var(--text-dim);font-size:13px;margin-bottom:14px">${c.desc}</p>
    <table class="detail-table">
      <tr><th></th><th>適性</th><th>実数値</th><th>コスト倍率</th></tr>
      ${rows}
    </table>
    <div class="exhaust-detail">
      <h4 style="font-size:13px;color:var(--text-dim);margin-bottom:6px">苦労値</h4>
      ${exhaustRows}
    </div>
  `;
  document.getElementById('detail-panel').classList.remove('hidden');
}

// ============================================================
//   キャラクター選択
// ============================================================
function showCharacterSelect() {
  showScreen('character-select-screen');
  const choices = shuffle(CHARACTER_POOL).slice(0, 3);
  const wrap = document.getElementById('character-choices');
  wrap.innerHTML = '';
  choices.forEach(c => {
    const sorted = ELEMENT_LIST.slice().sort((a,b) => c.aptitude[b] - c.aptitude[a]);
    const rows = sorted.map(el => `
      <div class="aptitude-row">
        <span class="aptitude-label">${ELEMENT_ICON[el]} ${ELEMENT_NAME[el]}</span>
        <span><span class="aptitude-stars">${aptToStars(c.aptitude[el])}</span><span class="aptitude-num">${c.aptitude[el]}</span></span>
      </div>
    `).join('');
    const card = document.createElement('div');
    card.className = 'choice-card choice-character';
    card.innerHTML = `
      <div class="char-emoji">${c.emoji}</div>
      <div class="char-name">${c.name}</div>
      <div class="char-desc">${c.desc}</div>
      ${rows}
    `;
    card.addEventListener('click', () => selectCharacter(c));
    wrap.appendChild(card);
  });
}

function selectCharacter(template) {
  state.character = {
    ...template,
    aptitude: { ...template.aptitude },
    exhaustion: { fire: 0, water: 0, wind: 0, earth: 0 },
  };
  state.deck = STARTER_DECK_IDS.slice();
  state.gold = 0;
  state.stageIndex = 0;
  proceedStage();
}

// ============================================================
//   カード報酬
// ============================================================
function showRewardScreen() {
  showScreen('reward-screen');
  const stagePhase = state.stageIndex; // 報酬は3 or 7 のあたり
  const isLate = stagePhase >= 6;
  const pool = CARDS.filter(c => !c.awakenOnly && (c.rarity === 'normal' || (isLate && c.rarity === 'rare')));
  // レアの確率を上げる: 序盤 normal重視、後半 rareも混ぜる
  const choices = [];
  const used = new Set();
  while (choices.length < 3 && used.size < pool.length) {
    const isRare = Math.random() < (isLate ? 0.4 : 0.15);
    const subPool = pool.filter(c => isRare ? c.rarity === 'rare' : c.rarity === 'normal');
    const candidate = subPool[Math.floor(Math.random() * subPool.length)];
    if (!candidate || used.has(candidate.id)) continue;
    used.add(candidate.id);
    choices.push(candidate);
  }
  const wrap = document.getElementById('reward-choices');
  wrap.innerHTML = '';
  choices.forEach(c => {
    const card = renderCard(c);
    card.classList.remove('unaffordable');
    card.addEventListener('click', () => {
      state.deck.push(c.id);
      state.stageIndex++;
      proceedStage();
    });
    wrap.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('skip-reward-btn').addEventListener('click', () => {
    state.stageIndex++;
    proceedStage();
  });
});

// ============================================================
//   ショップ
// ============================================================
function showShopScreen() {
  showScreen('shop-screen');
  state.shopState = { removeMode: false };
  document.getElementById('shop-gold').textContent = state.gold;
  document.getElementById('remove-list').classList.add('hidden');

  // 通常カード3枚 + 覚醒カード1枚をランダム
  const normalPool = CARDS.filter(c => !c.awakenOnly && c.rarity !== 'awaken');
  const awakenPool = CARDS.filter(c => c.awakenOnly);
  const items = [];
  const used = new Set();
  while (items.length < 3 && used.size < normalPool.length) {
    const c = normalPool[Math.floor(Math.random() * normalPool.length)];
    if (used.has(c.id)) continue;
    used.add(c.id);
    items.push({ card: c, price: c.rarity === 'rare' ? 35 : 20 });
  }
  const awakenCard = awakenPool[Math.floor(Math.random() * awakenPool.length)];
  items.push({ card: awakenCard, price: 50 });

  const wrap = document.getElementById('shop-items');
  wrap.innerHTML = '';
  items.forEach((item, idx) => {
    const card = renderCard(item.card);
    card.classList.remove('unaffordable');
    card.classList.add('shop-item');
    if (state.gold < item.price) card.classList.add('disabled');
    const priceEl = document.createElement('div');
    priceEl.className = 'shop-price';
    priceEl.textContent = `${item.price}G`;
    card.appendChild(priceEl);
    card.addEventListener('click', () => {
      if (state.gold < item.price) return;
      state.gold -= item.price;
      state.deck.push(item.card.id);
      card.style.opacity = '0.3';
      card.style.pointerEvents = 'none';
      document.getElementById('shop-gold').textContent = state.gold;
    });
    wrap.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('leave-shop-btn').addEventListener('click', () => {
    state.stageIndex++;
    proceedStage();
  });
  document.getElementById('remove-card-btn').addEventListener('click', () => {
    if (state.gold < 30) return;
    if (state.deck.length <= 4) {
      log('<span class="system">これ以上は除外できない（最低4枚）</span>');
      return;
    }
    showRemoveList();
  });
  document.getElementById('cancel-remove-btn').addEventListener('click', () => {
    document.getElementById('remove-list').classList.add('hidden');
  });
});

function showRemoveList() {
  const list = document.getElementById('remove-list');
  list.classList.remove('hidden');
  const wrap = document.getElementById('remove-cards');
  wrap.innerHTML = '';
  state.deck.forEach((cardId, idx) => {
    const card = CARD_BY_ID[cardId];
    const el = renderCard(card);
    el.classList.remove('unaffordable');
    el.addEventListener('click', () => {
      state.gold -= 30;
      state.deck.splice(idx, 1);
      document.getElementById('shop-gold').textContent = state.gold;
      list.classList.add('hidden');
    });
    wrap.appendChild(el);
  });
}

// ============================================================
//   終了画面
// ============================================================
function showEndScreen(win) {
  showScreen('end-screen');
  const t = document.getElementById('end-title');
  t.textContent = win ? 'VICTORY' : 'DEFEAT';
  t.classList.toggle('lose', !win);
  const stage = STAGE_ORDER[state.stageIndex];
  document.getElementById('end-message').innerHTML = win
    ? `${state.character.name} は四元キメラを討伐した！<br>所持G: ${state.gold}　デッキ枚数: ${state.deck.length}枚`
    : `${state.enemy ? state.enemy.name : '敵'} を倒し切れなかった…<br>到達: Stage ${stage ? stage.label : '?'}　所持G: ${state.gold}`;
}

// ============================================================
//   画面切替
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ============================================================
//   初期化
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-btn').addEventListener('click', showCharacterSelect);
  document.getElementById('restart-btn').addEventListener('click', () => showScreen('title-screen'));
  document.getElementById('end-turn-btn').addEventListener('click', endTurn);
  document.getElementById('execute-btn').addEventListener('click', executeQueue);
  document.getElementById('clear-btn').addEventListener('click', clearQueue);
  document.getElementById('character-panel').addEventListener('click', showCharacterDetail);
  document.getElementById('close-detail').addEventListener('click', () => {
    document.getElementById('detail-panel').classList.add('hidden');
  });
  document.getElementById('detail-panel').addEventListener('click', (e) => {
    if (e.target.id === 'detail-panel') {
      document.getElementById('detail-panel').classList.add('hidden');
    }
  });
});
