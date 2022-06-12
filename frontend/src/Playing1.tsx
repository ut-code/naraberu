import { useState } from 'react'
import './App.css' //cssを呼び出すときに必要


let InitTerm = 0;
const subtol = Math.floor( Math.random() * (10 - 2) ) + 2;
const subfir = Math.floor( Math.random() * (10 - 1) ) + 1;
function makeNewSequence(first, tolerance, init){ //初めの文字列を生成
  InitTerm = 0;
  let putout = String(first);
  let savenum = first;
  for (let i=1; i<init; i++){
    savenum = savenum + tolerance;
    putout += ". "+String(savenum);
  }
  InitTerm = savenum;
  return putout;
}

export default function Playing1() {
  const InitialNum = 3; //最初何項表示させるか
  //初項と公差は1〜9からランダム
  const Tolerance = subtol; //公差
  const FirstTerm = subfir; //初項

  const [NewAns, setNewAns] = useState(""); //ユーザーの回答
  const [score,setScore] = useState(0); //ユーザーのスコア
  const [TheSequence, setTheSequence] = useState(makeNewSequence(FirstTerm,Tolerance,InitialNum));  //数列を文字列で格納
  const [TermNum, setTermNum] = useState(InitialNum);  //項の番号
  const [NowTerm, setNowTerm] = useState(InitTerm);  //最新の項の値(初期値は初項)
  const [WrongState, setWrongState] = useState(false);  //間違えた状態(エラーメッセージを表示するかどうか)

  const FuncSubmit = () =>{ //提出を受けて対応する反応を返す
    const copiedSequence = TheSequence;
    CheckAns() ?
      (
        setNowTerm(CalTerms()),
        setTermNum(TermNum+1),
        setTheSequence(copiedSequence+". "+NewAns),
        setScore(score+giveReward()),
        setWrongState(false)
      ):(
        setWrongState(true)
      );
      setNewAns("");
  };

  const CheckAns = () =>{ //回答が正しいか吟味する
      return Number(NewAns) == CalTerms();
  };

  const CalTerms = () =>{ //次の項を計算する
    return NowTerm + Tolerance;
  };
  
  let get_text = document.getElementById("input");  //テキストボックスのidを取得
  get_text?.addEventListener('keypress', enterEvent);   //キーイベントを設定
  function enterEvent(e){
    if (e.keyCode === 13){  //テキストボックス選択中にEnterキーを押したとき
      FuncSubmit();
    }
  }

  const giveReward = () =>{ //SCOREを決定
    return Math.floor(TermNum/4);
  }

  const doneAction=() =>{ //終了後
    document.location.href="score.html?score="+score+"&level=1";
  }

  document.getElementById("input")?.focus();
  return (
    <>
      <div className="titleArea">
        <div id="putLevel">Level 1</div>
        <div id="LevelTitle">等差数列</div>
      </div>
      <div className="scoreArea">
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