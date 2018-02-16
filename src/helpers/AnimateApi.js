import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 500,
      defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
}

const animations = {
    'fadeInUp' : { 
        entering: { 
            opacity: 0,
            transform: `translate3d(0,10px,0)`
        },
        entered:  { 
            opacity: 1,
            transform: `translate3d(0,-10,0)`
        },
    },
    'fadeIn' : { 
        entering: { 
            opacity: 0,
        },
        entered:  { 
            opacity: 1,
        },
    },
    'scaleIn' : { 
        entering: { 
            opacity: 0,
            transform: `scale(.98,.98)`, 
        },
        entered:  { 
            opacity: 1,
            transform: `scale(1,1)`, 
        },
    },
    'slideDown' : { 
        entering: { 
            opacity: 0,
            transform: `translate3d(0,-100%,0)`, 
        },
        entered:  { 
            opacity: 1,
            transform: `translate3d(0,0,0)`, 
        },
    }
};

const FadeIn = (props) => (
    <Transition in={props.in} timeout={duration}>
      {(state) => (
        <div style={{ ...defaultStyle, ...animations['fadeIn'][state] }}>
         {props.children}
        </div>
      )}
    </Transition>
);

const FadeInUp = (props) => (
    <Transition in={props.in} timeout={duration}>
      {(state) => (
        <div style={{ ...defaultStyle, ...animations['fadeInUp'][state] }}>
         {props.children}
        </div>
      )}
    </Transition>
);

const ScaleIn = (props) => (
  <Transition in={props.in} timeout={duration}>
    {(state) => (
      <div style={{ ...defaultStyle, ...animations['scaleIn'][state] }}>
       {props.children}
      </div>
    )}
  </Transition>
);

const SlideDown = (props) => (
    <Transition in={props.in} timeout={duration}>
      {(state) => (
        <div style={{ ...defaultStyle, ...animations['slideDown'][state] }}>
         {props.children}
        </div>
      )}
    </Transition>
  );

export { FadeInUp, FadeIn, ScaleIn, SlideDown};