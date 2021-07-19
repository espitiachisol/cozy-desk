// import React from "react";

// class ClockSetting extends React.Component {
//   render() {
//     return (
//       <div className="setting">
//         <h3 className="setting__title" id={this.props.labelID}>
//           {this.props.title}
//         </h3>
//         <button
//           disabled={this.props.status}
//           className="setting__btn btn"
//           id={this.props.incrementID}
//           onClick={this.handleClick}
//           onClick={this.props.increment}
//         >
//           <i class="fas fa-plus"></i>
//         </button>
//         <span className="setting__value" id={this.props.valueID}>
//           {this.props.time}
//         </span>
//         <button
//           disabled={this.props.status}
//           className="setting__btn btn"
//           id={this.props.decrementID}
//           onClick={this.props.decrement}
//         >
//           <i class="fas fa-minus"></i>
//         </button>
//       </div>
//     );
//   }
// }

// const convertTime = (timer) => {
//   let minute = Math.floor(timer / 60);
//   if (minute < 10) minute = "0" + minute;

//   let second = timer - 60 * minute;
//   if (second < 10) second = "0" + second;

//   return `${minute}:${second}`;
// };

// class CurrentTimer extends React.Component {
//   render() {
//     return (
//       <div className={this.props.status ? "timer is-running" : "timer"}>
//         <span id="timer-label">{this.props.timeLabel}</span>
//         <h1 id="time-left" className="timer__value">
//           {convertTime(this.props.currentTime)}
//         </h1>
//         <div>
//           <button id="start_stop" className="btn" onClick={this.props.start}>
//             <i
//               className={this.props.status ? "fas fa-pause" : "fas fa-play"}
//             ></i>
//           </button>
//           <button id="reset" className="btn" onClick={this.props.reset}>
//             <i className="fas fa-sync-alt"></i>
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// class Clock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       breakTime: Number.parseInt(this.props.defaultBreakLength, 10),
//       sessionTime: Number.parseInt(this.props.defaultSessionLength, 10),
//       timeLabel: "Session",
//       timer: Number.parseInt(this.props.defaultSessionLength, 10) * 60,
//       timerFunction: null,
//       isRunning: false,
//     };

//     this.incrementBreakTime = this.incrementBreakTime.bind(this);
//     this.decrementBreakTime = this.decrementBreakTime.bind(this);
//     this.incrementSessionTime = this.incrementSessionTime.bind(this);
//     this.decrementSessionTime = this.decrementSessionTime.bind(this);
//     this.decrementTimer = this.decrementTimer.bind(this);
//     this.playSound = this.playSound.bind(this);
//     this.reset = this.reset.bind(this);
//     this.startSession = this.startSession.bind(this);
//     this.timerControl = this.timerControl.bind(this);
//   }

//   incrementBreakTime = () => {
//     // should not be able to set a length to > 60
//     if (this.state.breakTime < 60 && !this.state.isRunning) {
//       this.setState({
//         breakTime: this.state.breakTime + 1,
//       });
//     }
//   };

//   decrementBreakTime = () => {
//     // should not be able to set a length to <= 0
//     if (this.state.breakTime > 1 && !this.state.isRunning) {
//       this.setState({
//         breakTime: this.state.breakTime - 1,
//       });
//     }
//   };

//   incrementSessionTime = () => {
//     // should not be able to set a length to > 60
//     if (this.state.sessionTime < 60 && !this.state.isRunning) {
//       this.setState({
//         sessionTime: this.state.sessionTime + 1,
//         timer: (this.state.sessionTime + 1) * 60,
//       });
//     }
//   };

//   decrementSessionTime = () => {
//     // should not be able to set a length to <= 0
//     if (this.state.sessionTime > 1 && !this.state.isRunning) {
//       this.setState({
//         sessionTime: this.state.sessionTime - 1,
//         timer: (this.state.sessionTime - 1) * 60,
//       });
//     }
//   };

//   decrementTimer() {
//     this.setState({ timer: this.state.timer - 1 });
//   }

//   playSound(timer) {
//     if (timer === 0) {
//       this.sound.play();
//     }
//   }

//   reset() {
//     this.setState({
//       breakTime: 5,
//       sessionTime: 25,
//       timeLabel: "Session",
//       timer: 1500,
//       timerFunction: null,
//       isRunning: false,
//     });

//     this.state.timerFunction && clearInterval(this.state.timerFunction);

//     this.sound.pause();
//     this.sound.currentTime = 0;
//   }

//   timerControl() {
//     if (this.state.timer === 0) {
//       this.playSound(this.state.timer);
//     } else if (this.state.timer === -1) {
//       if (this.state.timeLabel === "Session") {
//         this.setState({
//           timeLabel: "Break",
//           timer: this.state.breakTime * 60,
//         });
//       } else {
//         this.setState({
//           timeLabel: "Session",
//           timer: this.state.sessionTime * 60,
//         });
//       }
//     }
//   }

//   startSession() {
//     if (!this.state.isRunning) {
//       this.setState({
//         isRunning: !this.state.isRunning,
//         timerFunction: setInterval(() => {
//           this.decrementTimer();
//           this.timerControl();
//         }, 1000),
//       });
//     } else {
//       this.state.timerFunction && clearInterval(this.state.timerFunction);

//       this.sound.pause();
//       this.sound.currentTime = 0;
//       this.setState({
//         isRunning: !this.state.isRunning,
//         timerFunction: null,
//       });
//     }
//   }

//   render() {
//     return (
//       <div className="clock">
//         <h1>Tomato Clock</h1>
//         <div className="settings-list">
//           <ClockSetting
//             title={"Break Time"}
//             labelID={"break-label"}
//             incrementID={"break-increment"}
//             decrementID={"break-decrement"}
//             valueID={"break-length"}
//             time={this.state.breakTime}
//             status={this.state.isRunning}
//             increment={this.incrementBreakTime}
//             decrement={this.decrementBreakTime}
//           />
//           <ClockSetting
//             title={"Session Time"}
//             labelID={"session-label"}
//             incrementID={"session-increment"}
//             decrementID={"session-decrement"}
//             valueID={"session-length"}
//             time={this.state.sessionTime}
//             status={this.state.isRunning}
//             increment={this.incrementSessionTime}
//             decrement={this.decrementSessionTime}
//           />
//         </div>
//         <CurrentTimer
//           status={this.state.isRunning}
//           currentTime={this.state.timer}
//           reset={this.reset}
//           start={this.startSession}
//           timeLabel={this.state.timeLabel}
//         />
//         <audio
//           id="beep"
//           preload="auto"
//           ref={(audio) => {
//             this.sound = audio;
//           }}
//           src="http://www.dartmouth.edu/~milton/reading_room/graphics/nightingale.wav"
//         />
//       </div>
//     );
//   }
// }

// // ReactDOM.render(
// //   <Clock defaultBreakLength="5" defaultSessionLength="25" />,
// //   document.getElementById("app")
// // );
