const hands = ['rock', 'scissors', 'paper']; // じゃんけんの手をグローバル定数として宣言
let result_message = "";
// 勝敗カウント
let winStreakCount = 0;
let winCount = 0;
let loseCount = 0;
let winRate = "0.0";
let winScore = parseInt(localStorage.getItem('winScore')) || 0;
let loseScore = parseInt(localStorage.getItem('loseScore')) || 0;
let maxStreakCount = parseInt(localStorage.getItem('maxStreakCount')) || 0;
let allWinRate = (winScore / (winScore + loseScore) * 100).toFixed(1);

let showEffectTimeount = null;

updateScore();

// じゃんけんの手をランダムに返す関数
function jankenRandom() {
    const r = Math.random() * 3;    // 小数点0.000001〜0.999999までの乱数を生成
    const n = Math.floor(r);     // 繰り上げ

    return hands[n];
}

// じゃんけんの判定、結果の表示をする関数
function play(player_hand) {
    let result = '';
    let imgSrc = '';
    const pc_hand = jankenRandom();  // コンピューターの手を計算
    console.log("pc: " + pc_hand);

    const winEffect = document.getElementById('win-effect');
    const loseEffect = document.getElementById('lose-effect');

    winEffect.style.display = 'none';
    loseEffect.style.display = 'none';
    $("#judgment").html("");


    $("#pc_hands").html(translateHand(pc_hand));   // コンピューターの手を表示
    $("#pc_hands_img").html(handimage(pc_hand));  // コンピューターの手の画像を表示

    // あいこのとき
    if (player_hand == pc_hand) {
        $("#judgment").html("あいこ");
        $("#popup-content-aiko").show();
    }
    // プレイヤーが勝つとき
    else if ((player_hand == "rock" && pc_hand == "scissors") ||
        (player_hand == "scissors" && pc_hand == "paper") ||
        (player_hand == "paper" && pc_hand == "rock")) {
        result_message = "勝ち";
        $("#popup-content-aiko").hide();
        showEffect(winEffect, "勝ち");
        // $("#judgment").html("勝ち");
        winStreakCount++;
        winCount++;
        winScore++;
        localStorage.setItem('winScore', winScore);
        if (winStreakCount > maxStreakCount) {
            maxStreakCount = winStreakCount;
            localStorage.setItem('maxStreakCount', maxStreakCount);
            $("#best-score").show();
        }
    }
    // プレイヤーが負けるとき
    else {
        result_message = "負け";
        $("#popup-content-aiko").hide();
        showEffect(loseEffect, "負け");
        // $("#judgment").html("負け");
        loseCount++;
        loseScore++;
        winStreakCount = 0;
        localStorage.setItem('loseScore', loseScore);
    }

    $("#popup").fadeIn();
    updateScore();
}

// ボタンが押されたとき
$('.hands li').click(function () {
    const player_hand = $(this).attr('id'); // .clickが1つになるように工夫
    console.log("player: " + player_hand);
    play(player_hand);
});

$('#popup-content-aiko .hands li').click(function () {
    const player_hand = $(this).attr('id'); // .clickが1つになるように工夫
    console.log("player: " + player_hand);
    $("#popup").hide(1000, function(){
        play(player_hand);
      });
});


// ポップアップを閉じるボタン
$('.close-btn').click(function () {
    $("#popup").fadeOut();
    const winEffect = document.getElementById('win-effect');
    const loseEffect = document.getElementById('lose-effect');

    winEffect.style.display = 'none';
    loseEffect.style.display = 'none';

    clearTimeout(showEffectTimeount);
});

// ポップアップの背景をクリックしたときは、エフェクトを消す
$('#win-effect, #lose-effect').click(function () {
    const winEffect = document.getElementById('win-effect');
    const loseEffect = document.getElementById('lose-effect');

    winEffect.style.display = 'none';
    loseEffect.style.display = 'none';

    $("#judgment").html(result_message);

    clearTimeout(showEffectTimeount);
});

// リセットボタン
$('#reset').click(function () {
    winStreakCount = 0;
    winCount = 0;
    loseCount = 0;
    winScore = 0;
    loseScore = 0;
    maxStreakCount = 0;
    localStorage.setItem('maxStreakCount', maxStreakCount);
    localStorage.setItem('winScore', winScore);
    localStorage.setItem('loseScore', loseScore);
    updateScore();
    $("#best-score").hide();
});

// 表示用に日本語に変換
function translateHand(hand) {
    switch (hand) {
        case 'rock':
            return 'グー';
        case 'scissors':
            return 'チョキ';
        case 'paper':
            return 'パー';
        default:
            return '';
    }
}

function handimage(hand) {
    return '<img src="./img/' + hand + '.png" alt="">';
}

function showEffect(effectElement, message) {
    effectElement.style.display = 'block';
    effectElement.style.animation = 'none';
    showEffectTimeount = setTimeout(() => {
        effectElement.style.animation = '';
    }, 1000);  // 強制的に再描画させてアニメーションをリセット
    showEffectTimeount = setTimeout(() => {
        $("#judgment").html(message);
        effectElement.style.display = 'none';
    }, 4000);  // 2秒後にエフェクトを非表示にする
}

// スコア表示を更新
function updateScore() {
    if((winCount + loseCount) ==0) {
        winRate = "0.0";
    } 
    else {
        winRate = (winCount / (winCount + loseCount) * 100).toFixed(1);
    }
    if((winScore + loseScore) == 0) {
        allWinRate = "0.0";
    }
    else {
        allWinRate = (winScore / (winScore + loseScore) * 100).toFixed(1);
    }
    $("#win-streak").html(winStreakCount);
    $("#win-count").html(winCount);
    $("#lose-count").html(loseCount);
    $("#win-score").html(winScore);
    $("#lose-score").html(loseScore);
    $("#max-streak").html(maxStreakCount);
    $("#win-rate").html(winRate);
    $("#win-rate-all").html(allWinRate);
}