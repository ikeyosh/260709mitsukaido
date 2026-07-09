const form = document.getElementById('selfCheckForm');
const resultSection = document.getElementById('resultSection');
const resultSummary = document.getElementById('resultSummary');
const personalityType = document.getElementById('personalityType');
const moodBehavior = document.getElementById('moodBehavior');
const actionAdvice = document.getElementById('actionAdvice');
const tipsList = document.getElementById('tipsList');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const answers = [];
  for (let index = 1; index <= 6; index += 1) {
    const selected = form.querySelector(`input[name="q${index}"]:checked`);
    if (!selected) {
      answers.push(null);
    } else {
      answers.push(Number(selected.value));
    }
  }

  if (answers.includes(null)) {
    errorMessage.textContent = 'すべての項目に答えてください。';
    resultSection.hidden = true;
    return;
  }

  errorMessage.textContent = '';

  const managementScore = answers[0] + answers[1] + answers[4] + answers[5];
  const stressScore = answers[2] + answers[3];
  const balance = managementScore - stressScore;

  let summary = '';
  let personality = '';
  let mood = '';
  let action = '';
  let tips = [];

  if (balance >= 14) {
    summary = '安定していて、今日の行動も自然に進めそうです。';
    personality = '計画型・落ち着き型。自分のペースで進めるのが得意です。';
    mood = '気分も比較的安定していて、行動の切り替えもスムーズです。';
    action = '今日の一歩は「宿題の最初の5分だけ」にしておくと、さらに気持ちが整います。';
    tips = [
      '一日の終わりに、次の宿題を1つだけ決める。',
      '少しだけ進んだら、自分をほめておく。',
    ];
  } else if (balance >= 8) {
    summary = '少しだけ負担を感じています。小さな習慣で整えられます。';
    personality = '相談型・柔軟型。人の助けを借りると前に進みやすい傾向です。';
    mood = '気分の揺れが少しあり、行動を始める前に迷いやすいです。';
    action = '迷ったら、今日の優先順位を「1つだけ」に絞って選びましょう。';
    tips = [
      '宿題は、難しいところより先に「できるところ」から始める。',
      '気分が落ちた時は、家族や先生に相談する。',
    ];
  } else {
    summary = '今は心も体も疲れていて、休息と整理が必要そうです。';
    personality = '内省型・慎重型。考えすぎると動きにくくなる傾向です。';
    mood = '気分が落ちやすく、行動が止まりやすい状態です。';
    action = '今日は「小さな目標1つ」と「休憩1回」を入れて、負担を減らしましょう。';
    tips = [
      '宿題を分けて、10分ずつ進める。',
      '無理をしないで、必要なら手伝いを頼む。',
    ];
  }

  resultSummary.textContent = summary;
  personalityType.textContent = personality;
  moodBehavior.textContent = mood;
  actionAdvice.textContent = action;

  tipsList.innerHTML = '';
  tips.forEach((tip) => {
    const item = document.createElement('li');
    item.textContent = tip;
    tipsList.appendChild(item);
  });

  resultSection.hidden = false;
});
