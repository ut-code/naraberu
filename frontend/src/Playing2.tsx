import { useState } from 'react'
import './App.css' //cssを呼び出すときに必要


let InitTerm = 0;
const subtol = Math.floor( Math.random() * (5 - 1) ) + 1;
const subfir = Math.floor( Math.random() * (10 - 1) ) + 1;
const subfir2 = Math.floor( Math.random() * (3 - 1) ) + 1;
function makeNewSequence(first, firstdif, tolerance, init){ //初めの文字列を生成
  InitTerm = 0;
  let putout = String(first);
  let savenum = first;
  let savedif = firstdif;
  for (let i=1; i<init; i++){
    savenum = savenum + savedif;
    putout += ". "+String(savenum);
    savedif = savedif + tolerance;
  }
  InitTerm = savenum;
  return [putout,savedif];
}

export default function Playing2() {
  const InitialNum = 5; //最初何項表示させるか
  //初項と公差は1〜9からランダム
  const Tolerance = subtol; //階差の公差
  const FirstTerm = subfir; //初項1
  const FirstDifTerm = subfir2; //初項2(階差数列)

  const [NewAns, setNewAns] = useState(""); //ユーザーの回答
  const [score,setScore] = useState(0); //ユーザーのスコア
  const [TheSequence, setTheSequence] = useState(makeNewSequence(FirstTerm,FirstDifTerm,Tolerance,InitialNum)[0]);  //数列を文字列で格納
  const [TermNum, setTermNum] = useState(InitialNum);  //項の番号
  const [NowTerm, setNowTerm] = useState(InitTerm);  //最新の項の値(初期値は初項)
  const [DifTerm, setDifTerm] = useState(makeNewSequence(FirstTerm,FirstDifTerm,Tolerance,InitialNum)[1]);  //階差数列の値(初期値は初項)
  const [WrongState, setWrongState] = useState(false);  //間違えた状態(エラーメッセージを表示するかどうか)
  const [life, setLife] = useState(3);  //残りライフ

  const FuncSubmit = () =>{ //提出を受けて対応する反応を返す
    CheckAns() ? correct() : wrong();
      setNewAns("");
  };
  
  const correct = () =>{
    const copiedSequence = TheSequence;
    setNowTerm(CalTerms());
    setTermNum(TermNum+1);
    setDifTerm(DifTerm+Tolerance),
    setTheSequence(copiedSequence+". "+NewAns);
    setScore(score+giveReward());
    setWrongState(false);
  };
  
  const wrong = () =>{
    setWrongState(true);
    declineLife();
  };

  const CheckAns = () =>{ //回答が正しいか吟味する
      return Number(NewAns) == CalTerms();
  };

  const CalTerms = () =>{ //次の項を計算する
    return NowTerm + DifTerm;
  };
  
  let get_text = document.getElementById("input");  //テキストボックスのidを取得
  get_text?.addEventListener('keydown', enterEvent, {once: true});   //キーイベントを設定
  function enterEvent(e){
    if (e.keyCode === 13){  //テキストボックス選択中にEnterキーを押したとき
      FuncSubmit();
    }
  }

  const giveReward = () =>{ //SCOREを決定
    return TermNum*2;
  }

  const doneAction=() =>{ //終了後
    document.location.href="score.html?score="+score+"&level=2";
  }

  const declineLife=() =>{ //不正解時にライフを減らす処理
    if (life == 0){
      document.location.href="score.html?score="+score+"&level=2";
    } else {
      setLife(life-1);
    }
  }

  document.getElementById("input")?.focus();
  return (
    <>
      <div className="titleArea">
        <div id="putLevel">Level 2</div>
        <div id="LevelTitle">階差数列</div>
      </div>
      <div className="scoreArea">
        <div id="heartTag">
          <img id="heartImg" src="image/heart.png" width="12%"></img>&nbsp;
          ×{life}
        </div>
        <div id="scoreTag">
          <span id="scoreTxt">SCORE</span>　　　　　
          <span id="putScore">{score}</span>
        </div>
      </div>
      <div className="inner">
        <div id="seq">{TheSequence}</div>
        <div id="PutoutArea">
            &gt;&gt;
            <input
                value={NewAns}
                onChange={(e) => {setNewAns(e.target.value);}}
                placeholder=""
                id="input"
              />
        </div>
        <div id="wrongArea">{WrongState? "ERROR!":""}</div>
      </div>
      <div className="doneArea">
        <div id="doneButton" onClick={doneAction}>
          <span>DONE</span>　　　<img id='iconCheck' src='image/iconCheck.png' width='10%' height='10%'></img>
        </div>
      </div>
    </>
  );
}

//他ファイルで変更すべき箇所
//makeNewSequence(),CalTerms()の中身

//課題
//エラー音のバグ