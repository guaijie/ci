import React, { MouseEvent } from 'react';
import './index.less';
type Timing = {
  (f: number): number;
  reverse?: Timing;
};
type AnimationOption = {
  duration: number;
  timing: Timing;
  draw: (process: number) => void;
  count?: number;
  reverse?: boolean | number;
};
function animate({ duration, timing, draw, count, reverse }: AnimationOption) {
  const startTime = performance.now();
  let currCount = count !== undefined ? count : -1;
  const currReverse = reverse && -reverse;
  if (!currCount) return;
  requestAnimationFrame(function cb(time) {
    let fraction = (time - startTime) / duration;
    if (fraction > 1) fraction = 1;
    const progress = timing(fraction);
    draw(progress);
    if (fraction < 1) {
      requestAnimationFrame(cb);
    } else if (currReverse && currReverse < 0) {
      if (!timing.reverse) {
        const reverse: Timing = function (f: number) {
          return 1 - timing(f);
        };
        reverse.reverse = timing;
        timing.reverse = reverse;
      }
      animate({
        duration,
        timing: timing.reverse,
        draw,
        count: currCount,
        reverse: currReverse,
      });
    } else if (currCount !== -1 && --currCount) {
      if (timing.reverse) timing = timing.reverse;
      animate({
        duration,
        timing,
        draw,
        count: currCount,
        reverse: currReverse,
      });
    }
  });
}

function makeEaseOut(timing: Timing) {
  return function (timeFraction: number) {
    return 1 - timing(1 - timeFraction);
  };
}

function bounce(timeFraction: number) {
  for (let a = 0, b = 1; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return (
        -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      );
    }
  }
}

const bounceEaseInOut = makeEaseOut(bounce as Timing);
export default class Animation extends React.Component<
  Record<string, unknown>,
  { top: number | null }
> {
  state = {
    top: null,
  };
  start = (e: MouseEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    let top: null | number = this.state.top;
    if (top === null) {
      top = parseFloat(getComputedStyle(currentTarget).top);
      this.setState({ top });
    }
    const t = top;
    animate({
      duration: 1500,
      timing: bounceEaseInOut,
      draw: function (progress) {
        currentTarget.style.top = `${t + progress * 300}px`;
      },
      count: 1,
      // reverse: true,
    });
  };
  render() {
    return (
      <div className="desktop">
        <div className="ball" onClick={this.start}></div>
      </div>
    );
  }
}
